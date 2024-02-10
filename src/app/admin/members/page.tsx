import React from 'react'

import { auth } from '@/auth'

const MembersPage = async () => {
  const session = await auth()

  return <div>{JSON.stringify(session)}</div>
}

export default MembersPage
