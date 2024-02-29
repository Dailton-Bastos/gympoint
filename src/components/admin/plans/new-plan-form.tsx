'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

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
import { newPlanSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import * as z from 'zod'

export const NewPlanForm = () => {
  const form = useForm<z.infer<typeof newPlanSchema>>({
    resolver: zodResolver(newPlanSchema),
    defaultValues: {
      title: '',
      duration: 1,
      value: 1,
    },
    mode: 'onSubmit',
  })

  return (
    <Form {...form}>
      <form className='w-full h-full max-w-4xl mx-auto'>
        <div className='flex items-center justify-between w-full'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Cadastro de plano
          </h1>

          <div className='flex items-center justify-between gap-x-4'>
            <Button
              className='w-28 font-bold text-sm bg-gray-400 hover:bg-gray-500'
              asChild
              // disabled={isPending}
            >
              <Link href='/admin/plans'>VOLTAR</Link>
            </Button>

            <Button
              type='submit'
              className='w-28 font-bold text-sm'
              // disabled={isPending}
            >
              SALVAR
            </Button>
          </div>
        </div>

        <div className='space-y-4 bg-white shadow mt-5 rounded overflow-hidden p-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>TÍTULO DO PLANO</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='focus-visible:ring-transparent focus:border-[#EE4D64] text-gray-600 text-sm font-normal'
                    // disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-3 gap-x-4'>
            <FormField
              control={form.control}
              name='duration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>
                    DURAÇÃO (em meses)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='focus-visible:ring-transparent focus:border-[#EE4D64] text-gray-600 text-sm font-normal'
                      type='number'
                      // disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>PREÇO MENSAL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='focus-visible:ring-transparent focus:border-[#EE4D64] text-gray-600 text-sm font-normal'
                      type='number'
                      // disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className='font-bold'>PREÇO TOTAL</FormLabel>
              <FormControl>
                <Input
                  className='text-gray-600 text-sm font-normal bg-gray-200 border-gray-300'
                  disabled
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          </div>
        </div>
      </form>
    </Form>
  )
}
