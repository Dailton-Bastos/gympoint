import { db } from '@/lib/db'
import { getPasswordResetTokenByEmail } from '@/utils/passwordResetToken'
import crypto from 'crypto'

export const generatePasswordToken = async (email: string) => {
  const token = crypto.randomUUID()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  try {
    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
      await db.passwordResetToken.delete({ where: { id: existingToken.id } })
    }

    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    return passwordResetToken
  } catch {
    return null
  }
}
