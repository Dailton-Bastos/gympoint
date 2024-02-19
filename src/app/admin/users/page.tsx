import React from 'react'

import { UsersList } from '@/components/admin/users/list'
import { getAllUsers } from '@/utils/user'

const UsersPage = async () => {
  const users = await getAllUsers()

  return <UsersList allUsers={users} />
}

export default UsersPage
