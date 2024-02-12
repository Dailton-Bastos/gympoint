'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

import { newPassword } from '@/actions/new-password'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { ValidationPassword } from '@/components/shared/ValidationPassword'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useValidationPassword } from '@/hooks/useValidationPassword'
import { newPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import * as z from 'zod'

type FormType = z.infer<typeof newPasswordSchema>

export const NewPasswordForm = () => {
  const [viewPassword, setViewPassword] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const form = useForm<FormType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const { control, handleSubmit, watch } = form

  const { values, handleCheck, isValid } = useValidationPassword()

  const value = watch('password')

  const onSubmit = React.useCallback(
    (password: FormType) => {
      startTransition(() => {
        newPassword(password, token)
      })
    },
    [token]
  )

  React.useEffect(() => {
    handleCheck(value)
  }, [handleCheck, value])

  return (
    <CardWrapper>
      <Form {...form}>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-sm'>
                    NOVA SENHA
                  </FormLabel>

                  <FormControl>
                    <div className='relative'>
                      <Input
                        {...field}
                        placeholder='********'
                        type={viewPassword ? 'text' : 'password'}
                        className='focus-visible:ring-transparent'
                        disabled={isPending}
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

                  <ValidationPassword items={values} />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            className='w-full text-white font-bold'
            disabled={isPending || !isValid}
          >
            Alterar senha
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
