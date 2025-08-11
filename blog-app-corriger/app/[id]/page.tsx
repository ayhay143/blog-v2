import Bestblog from '@/components/bestblog'
import prisma from '../lib/db'

async function page({params}: { params: { id: string } }) {
   
      const blogs = await prisma.blog.findMany({
        where: {
          categoryId: Number(params.id)
        },
        include: {
          category: true
        }
        
      })
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4  w-full pt-15 pl-35 pr-35">
        {blogs.map((blog,i) => (
          <Bestblog number={i+1} 
          key={blog.id} 
          {...blog}/>
        ))}
    </div>
  )
}

export default page