import { db } from '@/lib/db'
import { User } from '@prisma/client'

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } })

    return user
  } catch {
    return null
  }
}

export { getUserByEmail }
