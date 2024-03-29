import React from 'react'

import { auth, signOut } from '@/auth'

const MembersPage = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          'use server'

          await signOut()
        }}
      >
        <button type='submit'>Sair</button>
      </form>
    </div>
  )
}

export default MembersPage
