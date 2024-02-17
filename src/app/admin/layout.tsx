import React from 'react'

import { Header } from '@/components/admin/header'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-full'>
      <Header />

      {children}
    </main>
  )
}

export default AdminLayout
