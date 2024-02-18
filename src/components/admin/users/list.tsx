'use client'

import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { TbUserEdit, TbUserCancel } from 'react-icons/tb'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

export const UsersList = () => {
  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Gerenciando usuários
        </h1>

        <div className='flex items-center justify-between gap-x-4'>
          <Button asChild className='w-36 font-bold text-sm'>
            <Link href='/admin/users/new'>CADASTRAR</Link>
          </Button>

          <div className='relative w-full flex-1'>
            <label htmlFor='simple-search' className='sr-only'>
              Buscar usuário
            </label>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <CiSearch size={20} />
            </div>

            <Input
              placeholder='Buscar usuário'
              type='text'
              className='min-w-56 block w-full p-2.5 ps-10 focus-visible:ring-transparent focus:border-[#EE4D64] text-gray-600 text-sm font-normal'
              id='simple-search'
            />
          </div>
        </div>
      </div>

      <div className='bg-white shadow mt-5 rounded overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-bold'>NOME</TableHead>
              <TableHead className='font-bold'>E-MAIL</TableHead>
              <TableHead className='font-bold'>PERFIL</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='py-2 px-4 w-2/6'>Dailton Bastos</TableCell>
              <TableCell className='py-2 px-4 w-2/6'>
                dailtonbastos@gmail.com
              </TableCell>
              <TableCell className='py-2 px-4'>Administrador</TableCell>
              <TableCell className='py-2 px-4'>
                <div className='flex items-center gap-x-1 justify-center'>
                  <Button
                    asChild
                    variant='link'
                    className='font-normal text-sm text-blue-400'
                  >
                    <Link href='/'>
                      <TbUserEdit size={18} className='mr-2' /> editar
                    </Link>
                  </Button>

                  <Button
                    variant='link'
                    className='font-normal text-sm text-red'
                  >
                    <TbUserCancel size={18} className='mr-2' />
                    excluir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
