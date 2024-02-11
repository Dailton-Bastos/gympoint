'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { forgot } from '@/actions/forgot'
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
import { forgotSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import * as z from 'zod'

type FormType = z.infer<typeof forgotSchema>

export const ForgotForm = () => {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<FormType>({
    resolver: zodResolver(forgotSchema),

    defaultValues: {
      email: '',
    },
  })

  const { control, handleSubmit } = form

  const onSubmit = React.useCallback((values: FormType) => {
    startTransition(() => {
      forgot(values)
    })
  }, [])

  return (
    <CardWrapper>
      <Form {...form}>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
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
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            className='w-full text-white font-bold'
            disabled={isPending}
          >
            Recuperar
          </Button>
        </form>
      </Form>

      <div className='flex items-center justify-center pt-4'>
        <Button size='sm' variant='link' className='font-normal px-0' asChild>
          <Link href='/auth/login'>Voltar</Link>
        </Button>
      </div>
    </CardWrapper>
  )
}
