import Bestblog from '@/components/bestblog'
import prisma from '../lib/db'



interface PageProps {
  params: Promise<{ id: string }>; // 👈 depuis Next.js 13.4, params peut être une Promise
}

async function page({ params }: PageProps) {
      const { id } = await params;
      const blogs = await prisma.blog.findMany({
        where: {
          categoryId: Number(id)
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