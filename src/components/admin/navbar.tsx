'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()

  const menu = React.useMemo(
    () => [
      {
        label: 'ALUNOS',
        href: '/admin/members',
      },
      {
        label: 'PLANOS',
        href: '/admin/plans',
      },
      {
        label: 'MATRÍCULAS',
        href: '/admin/subscriptions',
      },
      {
        label: 'PEDIDOS DE AUXÍLIO',
        href: '/admin/requests',
      },
    ],
    []
  )

  return (
    <nav className='flex items-center gap-x-5'>
      {menu.map((item) => (
        <Button
          variant='link'
          asChild
          className={cn(
            'font-semibold text-[15px] p-0 text-gray-400 hover:no-underline hover:text-black',
            pathname === item.href && 'text-black'
          )}
          key={item.href}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  )
}
