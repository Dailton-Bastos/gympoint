'use client'

import React from 'react'

import { Can } from '@/components/shared/Can'
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
        allowedRole: 'BOTH' as const,
      },
      {
        label: 'PLANOS',
        href: '/admin/plans',
        allowedRole: 'ADMIN' as const,
      },
      {
        label: 'MATRÍCULAS',
        href: '/admin/subscriptions',
        allowedRole: 'ADMIN' as const,
      },
      {
        label: 'PEDIDOS DE AUXÍLIO',
        href: '/admin/requests',
        allowedRole: 'BOTH' as const,
      },
    ],
    []
  )

  return (
    <nav className='flex items-center gap-x-5'>
      {menu.map((item) => (
        <Can key={item.href} allowedRole={item.allowedRole}>
          <Button
            variant='link'
            asChild
            className={cn(
              'font-semibold text-[15px] p-0 text-gray-400 hover:no-underline hover:text-black',
              pathname === item.href && 'text-black'
            )}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        </Can>
      ))}
    </nav>
  )
}
