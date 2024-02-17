'use client'

import React from 'react'

import { logout } from '@/actions/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Link from 'next/link'

export const UserInfo = () => {
  const user = useCurrentUser()

  const handleLogout = React.useCallback(async () => {
    await logout()
  }, [])

  return (
    <div className='flex items-center gap-2'>
      <div className='flex flex-col items-end'>
        <Button
          asChild
          variant='link'
          className='font-bold text-sm p-0 h-auto hover:no-underline text-gray-600 hover:text-black'
        >
          <Link href='/profile'>{user?.name || user?.email}</Link>
        </Button>

        <Button
          variant='link'
          className='text-red text-sm p-0 h-auto hover:no-underline'
          onClick={handleLogout}
        >
          sair do sistema
        </Button>
      </div>

      {user?.image && (
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback>{user?.name || user?.email}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
