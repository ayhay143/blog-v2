import React from 'react'
import Image from "next/image";

function Cartblog({className,bgImageUrl}: {className?: string, bgImageUrl?: string}) {
  return (
    
    <div className={`${className}  rounded-lg shadow-md flex flex-col items-center justify-end p-4 bg-gray-200 text-black`}
    style={
        bgImageUrl
          ? {
              backgroundImage: `url(${bgImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
                height: "40vh",
               
            }
          : undefined
      }>
        <div id='context truncate'>
            <p className=' box-decoration-clone bg-blue-800 px-2 py-1 table rounded-xl'>CARS</p>
            <span className='text-2xl text-white font-bold box-decoration-clone bg-black relative '>This is a cart blog component. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi tene eligendi ducimus quis.</span>
        </div>
        <div id='info' className='flex items-center flex-start w-full mt-4'>
            <div id='icon'className='border rounded-xl mr-3'>
              <Image src="icons8-search.svg"  alt="Description de l'image" width={20} height={20}/>
              </div>
            <div id='date-auteur'>yahya elyoufi , 11jun</div>
        </div>
    </div>
  )
}

export default Cartblog