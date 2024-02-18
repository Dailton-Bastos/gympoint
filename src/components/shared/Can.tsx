import React from 'react'

import { useCan } from '@/hooks/useCan'
import type { UserRole } from '@prisma/client'

type Props = {
  children: React.ReactNode
  allowedRole: UserRole | 'BOTH'
}

export const Can = ({ children, allowedRole = 'BOTH' }: Props) => {
  const userCanSeeComponent = useCan({ allowedRole })

  if (!userCanSeeComponent) return null

  return <>{children}</>
}
