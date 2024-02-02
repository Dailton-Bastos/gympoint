'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'

export const Social = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center py-2.5'>
      <div className='w-full flex items-center pb-4'>
        <div className='h-px w-full flex-1 bg-gray-100' />
        <span className='px-4 text-sm text-neutral-400'>OU</span>
        <div className='h-px w-full flex-1 bg-gray-100' />
      </div>

      <Button variant='outline' className='w-full flex items-center gap-x-2'>
        <FcGoogle className='h-5 w-5' />
        Google
      </Button>
    </div>
  )
}
