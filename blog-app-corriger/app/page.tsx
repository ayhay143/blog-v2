import Bestblog from "@/components/bestblog";
import Cartblog from "@/components/cartblog";
import Cartblogv2 from "@/components/cartblogv2";
import Textcard from "@/components/textcard";
import prisma from "./lib/db";
import Gridcartslayout from "@/components/gridcartslayout";
import { Session } from "inspector/promises";
import { auth } from "./lib/auth";


export default async function Home() {
  const session = await auth();
  const email = session?.user?.email || "";

  const [cartblog, cartblogv2, textcard, bestblog] = await prisma.$transaction([
  prisma.blog.findMany({
    take: 1,
    orderBy: { createdAt: 'asc' },
    select : {
      title: true,
      image: true,
      updatedAt: true,
      id: true,
      author: {
        select: {
          name: true,
          urlimage: true,
        },
      },
      category: {
        select: {
          name: true,
          color: true,
        },
      },
  }}),
  prisma.blog.findMany({
    take: 2,
    skip: 1,
    orderBy: { createdAt: 'asc' },
    select : {
      title: true,
      image: true,
      updatedAt: true,
      id: true,
      author: {
        select: {
          name: true,
          urlimage: true,
        },
      },
      category: {
        select: {
          name: true,
          color: true,
        },
      },
    }}),
  prisma.blog.findMany({
    take: 5,
    skip: 3,
    orderBy: { createdAt: 'asc' },
    select : {
      title: true,
      updatedAt: true,
      id: true,
      author: {
        select: {
          name: true,
          urlimage: true,
        },
      },
      category: {
        select: {
          name: true,
          color: true,
        },
      },
    }}),
  prisma.blog.findMany({
    take: 4,
    orderBy: { likes: 'asc' },
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
          <div className="relative mb-4  ml-4">
          <div className="bg-gradient-to-r from-[#ec0761] via-[#871ea4] to-[#3837e5] h-[3px] w-1/10 rounded relative z-1"></div>
          <div className="bg-gray-200 h-[3px] relative -top-[3px] rounded"></div>
          </div>
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
      
      
      
       <Gridcartslayout nombreblog={4} email={email} />
          
      
      
    </main>
  );
}
