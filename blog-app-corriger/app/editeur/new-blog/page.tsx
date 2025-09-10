import prisma from '@/app/lib/db'
import { NewBlog } from '@/components/newblog'
import React from 'react'

async function page() {
  const cathegorie = await prisma.categiory.findMany()
  return (
    <div className='p-15 w-full'><NewBlog cath={cathegorie} /></div>
  )
}

export default page