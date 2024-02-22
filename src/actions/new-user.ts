'use server'

import { db } from '@/lib/db'
import { generateVerificationToken } from '@/lib/tokens'
import { newUserSchema } from '@/schemas'
import { sendVerificationEmail } from '@/utils/mails'
import { getUserByEmail } from '@/utils/user'
import * as z from 'zod'

export const newUser = async (values: z.infer<typeof newUserSchema>) => {
  const validatedFields = newUserSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Campos inválidos' }

  const { name, email, role } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: 'E-mail já em uso' }

  await db.user.create({
    data: {
      email,
      name,
      role,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail({
    email: verificationToken.email,
    token: verificationToken.token,
    userName: name,
  })

  return { success: 'Confirmação de e-mail enviada' }
}
