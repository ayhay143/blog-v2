import React from 'react'
import Image from "next/image";


function cartblogv2({
  className, 
  title,
  image,
  updatedAt,
  author,
  category,
}: any & {className?: string }) {
  return (
   
    <div className='rounded-lg shadow-md relative flex flex-col  justify-between m-2 h-full'>

       <div className={`${className}  rounded shadow-md   p-4 bg-gray-200 text-black mb-2 relative `}
       style={
            image
           ? {
               backgroundImage: `url(${image})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               height: "70%",
            }
            : undefined
        }>
            <p className=' box-decoration-clone bg-blue-800 px-3 py-1 table rounded-t-lg text-white absolute bottom-0 left-4'style={{ backgroundColor: category?.color }}>{category?.name}</p>
       </div>
        <div className=' flex flex-col justify-around px-5 py-5 h-1/8'>  
           <div id='context'>
               
               <span className='text-[1rem] font-bold   relative '>{title}</span>
           </div>
        </div>
        <div id='info' className='flex items-center  w-full  text-[0.8rem] text-gray-600 my-2 mx-5'>
               <div id='icon'className='border rounded-xl mr-3'><Image src={author?.urlimage ?? "/default-profile.png"}  alt="Description de l'image" width={20} height={20}/></div>
               <div id='date-auteur'>{author?.name}, {updatedAt ? updatedAt.toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }) : ''}</div>
        </div>
    </div>
     
  )
}

export default cartblogv2