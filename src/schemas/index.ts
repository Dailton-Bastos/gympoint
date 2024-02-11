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
