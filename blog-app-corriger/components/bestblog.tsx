import React from 'react'
import Image from "next/image";


function bestblog({number,bgImageUrl}:{number?: number,bgImageUrl?: string}) {
  return (
    <div className='flex flex-col items-center justify-between  rounded-lg shadow-md relative '>
        <div className='relative w-full  bg-gray-200 rounded-t-lg overflow-hidden'style={
            bgImageUrl
            ? {
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "15vh",

                
            }
            : undefined
        }>
          <p className='absolut top-10 left-10 bg-blue-200 inline p-1 rounded'>GADGETS</p>
        
        </div>

        <div id='text' className='flex flex-row'>
            <div className='p-4 text-6xl text-gray-300 text-shadow-lg/5 '>{number}</div>
            <div className='flex flex-col justify-between'>
                <p className='pt-4'>Study:Earbuds Use,Youngsters at High Risk of Hearing Loss</p>
                <div className='flex flex-row text-[0.5rem] text-gray-600 justify-start items-center gap-2 pb-1'>

                    <p className="font-bold">Shane Doe</p>
                    <p className='text-gray-300'>Mar 15 ,2020</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default bestblog