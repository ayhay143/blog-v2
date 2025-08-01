import React from 'react'
import Image from "next/image";


function Textcard() {
  return (
    <>
    <div className='flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg shadow-md m-2'>
        <div>
            <div>TECHNOLOGY</div>
            <div className='text-[0.9rem] py-1 font-bold line-clamp-3 max-w-90'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illo dicta natus quasi voluptatem rerum? Cum soluta aliquam odit fuga labore tempore blanditiis eos, porro corporis veniam voluptates iure eaque!</div>
            <div className='flex items-center flex-start mt-2 text-sm text-gray-600 gap-8'>
                <div>Shane Doe</div>
                <div className='flex items-center gap-2'>

        <div id='icon'><Image src="reshot-icon-clock-face-MG9QA83WVT.svg"  alt="Description de l'image" width={20} height={20}></Image></div>
                <div>6 Min</div>
                </div>
            </div>
        </div>
        <div id='icon'><Image src="reshot-icon-cat-face-PXUYA3H5DK.svg"  alt="Description de l'image" width={120} height={120}></Image></div>
    </div>
    <div className='bg-gray-200 h-[1px] mx-3'></div>
    </>
  )
}

export default Textcard