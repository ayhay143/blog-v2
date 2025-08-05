'use client'
import React, { useState } from 'react'
import { LoginButton } from "@/components/login-button";
import Image from "next/image";
import { useRouter } from 'next/navigation';
function  Cnav({ session }: { session: any }) {
    const [openLogin, setOpenLogin] = useState(false)
    const router = useRouter();
    
  const handleClick = () => {
    if (session) {
        router.push('/admin') 
         
        // redirige vers /dashboard
    }
    else {
      console.log("you are not logged in");
      setOpenLogin(true)
      
    }
  }
  return (
    <nav className="mx-auto maxe-w-screen-lg  ">
          <div className="flex justify-between items-center bg-black text-white text-xs py-3 px-34"> 
            <div className="flex items-center gap-4">
              <button>Start Here</button>
              <button>Demos</button>
              <button>Contact</button>
              <button>Buy Now</button>
            </div>
            <div>
              <button className="bg-white text-black rounded-full align-middle">
                <Image src="icons8-facebook-logo.svg"  alt="Description de l'image" width={20} height={20}/>
              </button>
              <button className="bg-white text-black rounded-full align-middle">
                <Image src="icons8-instagram-logo.svg"  alt="Description de l'image" width={20} height={20}/>
              </button>
              <button className="bg-white text-black rounded-full align-middle">
                <Image src="icons8-pinterest.svg"  alt="Description de l'image" width={20} height={20}/>
              </button >
              <button className="bg-white text-black rounded-full align-middle">
                <Image src="icons8-twitter-bird.svg"  alt="Description de l'image" width={20} height={20}/>
              </button>
              <button className="bg-white text-black rounded-full align-middle">
                <Image src="icons8-vine.svg"  alt="Description de l'image" width={20} height={20}/>
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#ec0761] via-[#871ea4] to-[#3837e5] h-[3px] "></div>
          <div className="flex justify-between items-center  shadow-xs py-4 px-34">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2  mr-14">
                <button><Image src="icons8-menu.svg"  alt="Description de l'image" width={20} height={20}/></button>
                <h1>TECHBLOG</h1>
              </div>
              <div className="flex items-center gap-15">
                <button>Home</button>
                <button>Features</button>
                <button>Technology</button>
                <button>Gadgets</button>
                <button>Phones</button>
                <button>Buy Theme</button>
                <button onClick={handleClick} >Admin</button>

              </div>
            </div>
            <div className="flex items-center gap-4">
              <LoginButton openLogin={openLogin} setOpenLogin={setOpenLogin}/>              
              <button><Image src="110827_moon_icon.svg"  alt="Description de l'image" width={30} height={30}/></button>
              <button><Image src="icons8-search.svg"  alt="Description de l'image" width={20} height={20}/></button>
            </div>
          </div>
         </nav>
  )
}

export default Cnav