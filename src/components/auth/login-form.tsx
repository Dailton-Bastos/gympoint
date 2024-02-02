'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import * as z from 'zod'

type FormType = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [viewPassword, setViewPassword] = React.useState(false)

  const form = useForm<FormType>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { control } = form

  return (
    <CardWrapper showSocial>
      <Form {...form}>
        <form className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-sm'>
                    SEU E-MAIL
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder='exemplo@email.com'
                      type='email'
                      className='focus-visible:ring-transparent'
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-sm'>SUA SENHA</FormLabel>

                  <FormControl>
                    <div className='relative'>
                      <Input
                        {...field}
                        placeholder='********'
                        type={viewPassword ? 'text' : 'password'}
                        className='focus-visible:ring-transparent'
                      />

                      <Button
                        type='button'
                        variant='link'
                        className='absolute top-0 end-0 p-3.5 rounded-e-md'
                        onClick={() => setViewPassword((prev) => !prev)}
                      >
                        {viewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />

                  <Button
                    size='sm'
                    variant='link'
                    className='font-normal px-0'
                    asChild
                  >
                    <Link href='/'>Esqueci minha senha</Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='w-full text-white font-bold'>
            Entrar no sistema
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}