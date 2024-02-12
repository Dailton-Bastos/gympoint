'use server'

import { generatePasswordToken } from '@/lib/tokens'
import { forgotSchema } from '@/schemas'
import { sendPasswordResetEmail } from '@/utils/mails'
import { getUserByEmail } from '@/utils/user'
import * as z from 'zod'

export const forgot = async (values: z.infer<typeof forgotSchema>) => {
  const validatedFields = forgotSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'E-mail inválido' }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'E-mail não encontrado!' }
  }

  const passwordResetToken = await generatePasswordToken(email)

  if (!passwordResetToken?.token) {
    return { error: 'Ocorreu um erro!' }
  }

  await sendPasswordResetEmail({
    email: passwordResetToken.email,
    token: passwordResetToken.token,
    userName: existingUser.name,
  })

  return { success: 'E-mail enviado com sucesso!' }
}
