import Bestblog from "@/components/bestblog";
import Cartblog from "@/components/cartblog";
import Cartblogv2 from "@/components/cartblogv2";
import Textcard from "@/components/textcard";
import prisma from "./lib/db";


export default async function Home() {
  const [cartblog, cartblogv2, textcard, bestblog] = await prisma.$transaction([
  prisma.blog.findMany({
    take: 1,
    orderBy: { createdAt: 'asc' },
    include: {
      author: true,
      category: true,
  }}),
  prisma.blog.findMany({
    take: 2,
    skip: 1,
    orderBy: { createdAt: 'asc' },
    include: {
      author: true,
      category: true,
    }}),
  prisma.blog.findMany({
    take: 5,
    skip: 3,
    orderBy: { createdAt: 'asc' },
    include: {
      author: true,
      category: true,
    }
  }),
  prisma.blog.findMany({
    take: 4,
    orderBy: { likes: 'asc' },
    include: {
      author: true,
      category: true,
    }
  }),
   
]);
  return (
    <main className="flex flex-col items-center py-15 px-34 bg-white">
      
      
      <div id="1erpartie" className="flex flex-row gap-4 w-full justify-between">
        <div id="bentoblog" className="grid grid-flow-col grid-rows-2 gap-4 w-4/5 ">
        {cartblog.map((blog) => (
          
          <Cartblog
            key={blog.id}
            className="col-span-2"
            {...blog}
          />
        ))}
        {cartblogv2.map((blog) => (
          <Cartblogv2
            key={blog.id}
            className="col-span-2"
            {...blog}
          />
        ))}
        
        
        </div>
        <div id="peaplesFavorite">
          <h1 className="text-2xl font-bold mb-4  ml-4">People's Favorite</h1>
          <div className="grid grid-cols-1 gap-4">
            {textcard.map((blog) => (
          <Textcard
            key={blog.id}
            
            {...blog}
          />
        ))}
            
            
          </div>
        </div>
      </div>
      <div id="editorsPicks" className="flex items-center justify-center w-full relative pt-15">
        <div className=" bg-white px-3 z-1">Editor's Picks</div>
        <div className="absolute border-t-4 border-double border-clack w-full  "></div>
      </div>
      
      
      <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4  w-full pt-15">
        {bestblog.map((blog,i) => (
          <Bestblog number={i+1} 
          key={blog.id} 
          {...blog}/>
        ))}
        
       </div>
       
          
      
      
    </main>
  );
}
