'use client'

import React from 'react'
import { TbUserEdit, TbUserCancel } from 'react-icons/tb'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  plans: Array<{
    id: string
    title: string
    duration: number
    value: number
  }> | null
}

export const PlansList = ({ plans }: Props) => {
  const data = React.useMemo(() => {
    return plans
      ? plans.map((plan) => ({
          ...plan,
          duration: `${plan.duration} ${plan.duration > 1 ? 'meses' : 'mês'}`,
          price: formatPrice(plan.value),
        }))
      : []
  }, [plans])

  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-bold text-gray-900'>Gerenciando planos</h1>

        <Button asChild className='w-36 font-bold text-sm'>
          <Link href='/admin/plans/new'>CADASTRAR</Link>
        </Button>
      </div>

      <div className='bg-white shadow mt-5 rounded overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-bold'>TÍTULO</TableHead>
              <TableHead className='font-bold'>DURAÇÃO</TableHead>
              <TableHead className='font-bold'>VALOR p/ MÊS</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className='py-2 px-4 w-2/6'>{plan.title}</TableCell>
                <TableCell className='py-2 px-4 w-2/6'>
                  {plan.duration}
                </TableCell>
                <TableCell className='py-2 px-4 w-2/6'>{plan.price}</TableCell>

                <TableCell className='py-2 px-4'>
                  <div className='flex items-center gap-x-1 justify-center'>
                    <Button
                      asChild
                      variant='link'
                      className='font-normal text-sm text-blue-400'
                    >
                      <Link href={`/admin/plans/edit/${plan.id}`}>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
