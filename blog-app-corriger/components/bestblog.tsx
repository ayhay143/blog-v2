import React from 'react'
import Image from "next/image";


function bestblog({
  number,
  title,
  image,
  updatedAt,
  author,
  category,
}: CartblogProps & {number?: number }&{key: number}) {
  return (
    <div className='flex flex-col items-start justify-between  rounded-lg shadow-md relative '>
        <div className='relative w-full  bg-gray-200 rounded-t-lg overflow-hidden'style={
            image
            ? {
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "15vh",

                
            }
            : undefined
        }>
          <p className='absolut top-10 left-10 inline p-1 rounded' style={{ backgroundColor: category?.color }}>{category?.name}</p>
        
        </div>

        <div id='text' className='flex flex-row'>
            <div className='p-4 text-6xl text-gray-300 text-shadow-lg/5 '>{number}</div>
            <div className='flex flex-col justify-between'>
                <p className='pt-4'>{title}</p>
                <div className='flex flex-row text-[0.5rem] text-gray-600 justify-start items-center gap-2 pb-1'>

                    <p className="font-bold">{author?.name}</p>
                    <p className='text-gray-300'>{updatedAt ? updatedAt.toLocaleString('fr-FR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}) : ''}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default bestblog