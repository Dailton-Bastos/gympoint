'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'

export const Social = () => {
  const handleClick = React.useCallback(() => {
    signIn('google', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }, [])

  return (
    <div className='w-full flex flex-col items-center justify-center py-2.5'>
      <div className='w-full flex items-center pb-4'>
        <div className='h-px w-full flex-1 bg-gray-100' />
        <span className='px-4 text-sm text-neutral-400'>OU</span>
        <div className='h-px w-full flex-1 bg-gray-100' />
      </div>

      <Button
        variant='outline'
        className='w-full flex items-center gap-x-2'
        onClick={handleClick}
      >
        <FcGoogle className='h-5 w-5' />
        Google
      </Button>
    </div>
  )
}
