import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import Gridcartslayout from '@/components/gridcartslayout'
import React from 'react'

async function page() {
  const session = await auth();
  const email = session?.user?.email || "";
  const nombreblog = await prisma.blog.count({
    where: {
      author: {
        email: email,
      },
    },
  });
  return (
    <div className='mt-4 mx-2 w-full'>
      <Gridcartslayout nombreblog={nombreblog} email={email} />
    </div>
  )
}

export default page