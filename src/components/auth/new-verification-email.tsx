'use client'

import React from 'react'
import { PiCircleNotchBold } from 'react-icons/pi'
import LoadingBar from 'react-top-loading-bar'
import type { LoadingBarRef } from 'react-top-loading-bar'

import { newVerificationEmail } from '@/actions/new-verification-email'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const NewVerificationEmail = () => {
  const [isLoading, setIsLoading] = React.useState(true)

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const ref = React.useRef<LoadingBarRef | null>(null)

  const onConfirmationEmail = React.useCallback(() => {
    ref.current?.continuousStart()

    if (!token) {
      ref.current?.complete()

      setIsLoading(false)

      return
    }

    newVerificationEmail(token)
      .then(() => {
        ref.current?.complete()

        setIsLoading(false)
      })
      .catch(() => {
        ref.current?.complete()

        setIsLoading(false)
      })
  }, [token])

  React.useEffect(() => {
    onConfirmationEmail()
  }, [onConfirmationEmail])

  return (
    <CardWrapper>
      {isLoading && (
        <div className='flex items-center justify-center py-4 gap-x-2'>
          <PiCircleNotchBold
            className='animate-spin'
            size={26}
            color='#EE4D64'
          />{' '}
          <p className='font-serif text-lg'>Confirmando e-mail...</p>
        </div>
      )}

      {!isLoading && (
        <div className='flex items-center justify-center pt-4'>
          <Button size='sm' variant='link' className='font-normal px-0' asChild>
            <Link href='/auth/login'>Fazer login</Link>
          </Button>
        </div>
      )}

      <LoadingBar color='#EE4D64' ref={ref} />
    </CardWrapper>
  )
}
