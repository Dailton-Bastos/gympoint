import { loginSchema } from '@/schemas'
import { getUserByEmail } from '@/utils/user'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials)

        if (!validatedCredentials.success) return null

        const { email, password } = validatedCredentials.data

        const user = await getUserByEmail(email)

        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) return user

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
