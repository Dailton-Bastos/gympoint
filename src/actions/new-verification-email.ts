'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/utils/user'
import { getVerificationTokenByToken } from '@/utils/verificationToken'

export const newVerificationEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) return { error: 'Token não encontrado!' }

  const hasExpiredToken = new Date(existingToken.expires) < new Date()

  if (hasExpiredToken) return { error: 'Token expirado!' }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) return { error: 'E-mail não encontrado!' }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'E-mail confirmado com sucesso!' }
}
