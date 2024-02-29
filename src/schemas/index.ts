import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email obrigatório',
  }),
  password: z.string().min(1, {
    message: 'Senha obrigatória',
  }),
})

export const forgotSchema = z.object({
  email: z.string().email({
    message: 'Email obrigatório',
  }),
})

export const newPasswordSchema = z.object({
  password: z.string().min(8, {
    message: 'Mínimo de 8 caracteres',
  }),
})

export const newUserSchema = z.object({
  email: z.string().email({
    message: 'Email obrigatório',
  }),
  name: z.string().trim().min(1, {
    message: 'Nome obrigatório',
  }),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
})

export const newPlanSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Título obrigatório',
  }),
  duration: z.number({
    description: 'Duração obrigatória',
  }),
  value: z.coerce.number().min(0.01, {
    message: 'Preço mensal obrigatório',
  }),
})
