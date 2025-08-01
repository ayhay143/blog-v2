import React from 'react'
import Image from "next/image";


function cartblogv2({className,bgImageUrl}: {className?: string, bgImageUrl?: string}) {
  return (
   
    <div className='rounded-lg shadow-md relative flex flex-col  justify-between m-2'>

       <div className={`${className}  rounded shadow-md   p-4 bg-gray-200 text-black mb-2 relative `}
       style={
           bgImageUrl
           ? {
               backgroundImage: `url(${bgImageUrl})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               height: "30vh",
            }
            : undefined
        }>
            <p className=' box-decoration-clone bg-blue-800 px-3 py-1 table rounded-sm absolute bottom-0 left-4'>CARS</p>
       </div>
       <div className=' flex flex-col justify-around px-2 py-5 h-1/8'>  
           <div id='context'>
               
               <span className='text-[1rem] font-bold   relative '>This is a cart blog component. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi tene eligendi ducimus quis.</span>
           </div>
       </div>
           <div id='info' className='flex items-center  w-full mt-4 text-[0.8rem] text-gray-600 m-2'>
               <div id='icon'className='border rounded-xl mr-3'><Image src="reshot-icon-cat-face-PXUYA3H5DK.svg"  alt="Description de l'image" width={20} height={20}/></div>
               <div id='date-auteur'>yahya elyoufi , 11jun</div>
           </div>
    </div>
     
  )
}

export default cartblogv2