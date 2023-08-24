"use client";
import { getCookie ,setCookie,deleteCookie } from 'cookies-next';
import React, { ReactEventHandler } from 'react'
import Image from 'next/image'
import { useState } from 'react';
import {useRouter} from 'next/navigation';
import { refresh } from '../api/login/route';
import { hostHandler } from '../api/home/route';


function hosting() {
   const router=useRouter();
 const [select, setSelect] = useState('Self');

  const token = getCookie('accesstoken');
  const user = getCookie('User');
  const name = getCookie('Name');
  // if(!token){
  //     router.push('/login')
  // }

  if(!token && !user){
    router.push('/login')
   }
   else if(!token && user){
       refresh(String(user)).then((res)=>{
        const result =JSON.parse(JSON.stringify(res))
            if(res.status==200){
                setCookie('accesstoken',result.accesstoken,{
                    maxAge:60*2,
                    path:'/'   
                  })
            }
            else{
               // router.push('/login')
                router.replace('/login')
            }
        })
  }
  

  const handleHosting =  (event:any) => {
      event.preventDefault();
      hostHandler(String(select),String(user)).then((res)=>{
         console.log(res)
         if(res.status==200){
           router.push('/platform');
         }
       }
       )
   }
   const handleHostingXeroCodee =  (event:any) => {
    event.preventDefault();
    setSelect('XeroCodee')
    hostHandler(select,String(user)).then((res)=>{
       console.log(res)
       if(res.status==200){
         router.replace('/hosting');
       }
     }
     )
 }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('/assets/bgHome.png')] bg-[#C2DAFB]" > 
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">     
       <div className="bg-white rounded-3xl shadow-2xl flex justify-center w-4/5 ">

        <div className="p-8 flex flex-col items-center"> 
         <div className="flex flex-row  items-center  justify-center text-2xl font-sans font-extrabold">
         <Image className='w-auto' src="/assets/logo.png" width={150} height={150} alt="Xerocodee" />
         </div>

         <div className="py-3">
          <h2 className="text-3xl font-bold mb-2">
          Welcome {name ? `${name}` : "Arya Soni"} !
            </h2>

            <div className=" flex py-2 items-center">
    <div className="flex-grow border-t border-gray-400"></div>
    <span className="flex-shrink mx-1 text-xs font-bold text-gray-400">Choose From The Following Deployment Options.</span>
    <div className="flex-grow border-t border-gray-400"></div>
</div>


<div className='flex flex-row xl:space-x-96 lg:space-x-64 md:space-x-36 sm:space-x-20 pt-10 pb-44'>
             <button
                  type='submit'
                  className="bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-16 py-2 hover:bg-[#1F64FF] hover:text-white "
                   onClick={handleHosting}
                  >Self Hosting</button>
              
              <button
                  type='submit'
                  className="bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-12 py-2 hover:bg-[#1F64FF] hover:text-white "
                   onClick={handleHostingXeroCodee}
                  >XeroCodee Hosting</button>
 </div>
       
</div>

            </div>   
     
      
        </div>
       </main>
      </div>
  )
}

export default hosting