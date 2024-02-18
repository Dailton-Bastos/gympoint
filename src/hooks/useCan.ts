import { useCurrentRole } from '@/hooks/useCurrentRole'
import type { UserRole } from '@prisma/client'

type UseCanParams = {
  allowedRole: UserRole | 'BOTH'
}

export const useCan = ({ allowedRole }: UseCanParams) => {
  const currentRole = useCurrentRole()

  if (allowedRole === 'BOTH') return true

  return currentRole === allowedRole
}
