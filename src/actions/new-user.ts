'use server'

import { db } from '@/lib/db'
import { newUserSchema } from '@/schemas'
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

  return { success: 'Confirmação de e-mail enviada' }
}
