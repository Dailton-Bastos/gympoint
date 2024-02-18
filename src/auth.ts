import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getAccountByUserId } from '@/utils/account'
import { getUserById } from '@/utils/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'
import type { User } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserRole
      isOAuth: boolean
    } & Omit<User, 'id'>
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) return false

      const existingUser = await getUserById(user.id)

      // Allow OAuth only for ADMIN
      if (account?.provider !== 'credentials') {
        if (existingUser?.role !== 'ADMIN') return false

        return true
      }

      // Prevent sing in without email verification
      if (!existingUser?.emailVerified) return false

      return true
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role

      return token
    },

    async session({ token, session }) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub
      }

      if (token?.role && session?.user) {
        session.user.role = token.role as UserRole
      }

      if (session?.user) {
        session.user.name = token.name
        session.user.isOAuth = token.isOAuth as boolean

        if (token?.email) {
          session.user.email = token.email
        }
      }

      return session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
