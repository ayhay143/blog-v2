import React from 'react'
import Image from "next/image";


function Textcard({
  
  title,
  updatedAt,

  author,
  category,
}: CartblogProps & {className?: string }&{key: number}) {
  return (
    <>
    <div className='flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg shadow-md m-2'>
        <div>
            <div>{category?.name}</div>
            <div className='text-[0.9rem] py-1 font-bold line-clamp-3 max-w-90'>{title}</div>
            <div className='flex items-center flex-start mt-2 text-sm text-gray-600 gap-8'>
                <div>{author?.name}</div>
                <div className='flex items-center gap-2'>

        <div id='icon'><Image src="reshot-icon-clock-face-MG9QA83WVT.svg"  alt="Description de l'image" width={20} height={20}></Image></div>
                <div> {updatedAt ? updatedAt.toLocaleString('fr-FR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}) : ''}</div>
                </div>
            </div>
        </div>
        <div id='icon'><Image src={author?.urlimage ?? "/default-profile.png"}  alt="Description de l'image" width={120} height={120}></Image></div>
    </div>
    <div className='bg-gray-200 h-[1px] mx-3'></div>
    </>
  )
}

export default Textcard