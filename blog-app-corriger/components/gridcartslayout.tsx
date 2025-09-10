import prisma from '@/app/lib/db'
import React from 'react'
import Bestblog from './bestblog'

async function Gridcartslayout({ nombreblog ,email }: { nombreblog: number, email?: string }) {
    const bestblog = await prisma.blog.findMany({
    where: email ?{
        author:{
            email:email
        }
    }: {},
    take: nombreblog,
    orderBy: { likes: 'desc' },
    select : {
      title: true,
      image: true,
      updatedAt: true,
      id: true,
      author: {
        select: {
          name: true,
          urlimage: true,
        },},
      category: {
        select: {
          name: true,
          color: true,
        },
      },
    }
    })
  return (

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4  w-full pt-15">
        {bestblog.map((blog,i) => (
          <Bestblog number={i+1} 
          key={blog.id} 
          {...blog}/>
        ))}
    </div>
  )
}

export default Gridcartslayout