import React from 'react'

import { Navbar } from '@/components/admin/navbar'
import { UserInfo } from '@/components/auth/user-info'
import { Logo } from '@/components/shared/Logo'

export const Header = () => {
  return (
    <header className='w-full shadow'>
      <div className='flex items-center justify-between w-full max-w-[1440px] mx-auto px-8 py-3.5'>
        <div className='flex items-center justify-between gap-8'>
          <Logo />
          <div className='h-8 w-px bg-gray-200' />
          <Navbar />
        </div>

        <UserInfo />
      </div>
    </header>
  )
}
