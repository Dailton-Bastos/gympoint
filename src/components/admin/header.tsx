import React from 'react'

import { Navbar } from '@/components/admin/navbar'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'

export const Header = () => {
  return (
    <header className='w-full shadow'>
      <div className='flex items-center justify-between w-full max-w-[1440px] mx-auto px-8 py-3.5'>
        <div className='flex items-center justify-between gap-8'>
          <Logo />
          <div className='h-8 w-px bg-gray-200' />
          <Navbar />
        </div>

        <div className='flex flex-col'>
          <p>Dailton Bastos</p>
          <Button variant='link'>sair do sistema</Button>
        </div>
      </div>
    </header>
  )
}
