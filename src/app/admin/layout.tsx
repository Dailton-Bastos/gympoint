import React from 'react'

import { Header } from '@/components/admin/header'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-full bg-gray-100'>
      <Header />

      <section className='mx-auto container px-28 py-8'>{children}</section>
    </main>
  )
}

export default AdminLayout
