import React from 'react'

import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

type PropsType = {
  children: React.ReactNode
  showSocial?: boolean
}

export const CardWrapper = ({ children, showSocial = false }: PropsType) => {
  return (
    <Card className='w-full max-w-[360px] shadow-sm py-12 px-8'>
      <CardHeader className='p-0 pb-8'>
        <Header />
      </CardHeader>

      <CardContent className='p-0'>{children}</CardContent>

      {showSocial && (
        <CardFooter className='pb-0'>
          <Social />
        </CardFooter>
      )}
    </Card>
  )
}
