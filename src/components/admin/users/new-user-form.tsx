'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { newUser } from '@/actions/new-user'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { newUserSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import * as z from 'zod'

export const NewUserForm = () => {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: '',
      name: '',
      role: 'USER',
    },
    mode: 'onSubmit',
  })

  const handleSubmit = React.useCallback(
    (values: z.infer<typeof newUserSchema>) => {
      startTransition(() => {
        newUser(values)
      })
    },
    []
  )

  return (
    <Form {...form}>
      <form
        className='w-full h-full max-w-4xl mx-auto'
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className='flex items-center justify-between w-full'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Cadastro de usuário
          </h1>

          <div className='flex items-center justify-between gap-x-4'>
            <Button
              className='w-28 font-bold text-sm bg-gray-400 hover:bg-gray-500'
              asChild
              disabled={isPending}
            >
              <Link href='/admin/users'>VOLTAR</Link>
            </Button>

            <Button
              type='submit'
              className='w-28 font-bold text-sm'
              disabled={isPending}
            >
              SALVAR
            </Button>
          </div>
        </div>

        <div className='space-y-4 bg-white shadow mt-5 rounded overflow-hidden p-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>NOME COMPLETO</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='John Doe'
                    className='focus-visible:ring-transparent focus:border-[#EE4D64] text-gray-600 text-sm font-normal'
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>ENDEREÇO DE E-MAIL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='john.doe@email.com'
                    className='focus-visible:ring-transparent focus:border-[#EE4D64] text-gray-600 text-sm font-normal'
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>PERFIL</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex items-center gap-4'
                    disabled={isPending}
                  >
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='USER' />
                      </FormControl>
                      <FormLabel>Colaborador</FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ADMIN' />
                      </FormControl>
                      <FormLabel>Administrador</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
