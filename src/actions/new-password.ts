'use server'

import { db } from '@/lib/db'
import { newPasswordSchema } from '@/schemas'
import { sendConfirmationPasswordResetEmail } from '@/utils/mails'
import { getPasswordResetTokenByToken } from '@/utils/passwordResetToken'
import { getUserByEmail } from '@/utils/user'
import bcrypt from 'bcryptjs'
import * as z from 'zod'

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  const validatedFields = newPasswordSchema.safeParse(values)

  if (!token) return { error: 'Token obrigatório' }

  if (!validatedFields.success) return { error: 'Senha inválida' }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) return { error: 'Token não encontrado' }

  const hasExpiredToken = new Date(existingToken?.expires) < new Date()

  if (hasExpiredToken) return { error: 'Token expirado' }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) return { error: 'E-mail não encontrado' }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser?.id },
    data: {
      password: hashedPassword,
    },
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken?.id },
  })

  await sendConfirmationPasswordResetEmail({
    email: existingUser.email,
    userName: existingUser.name,
  })

  return { success: 'Senha alterada com sucesso!' }
}
