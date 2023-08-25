
"use client";
import { getCookie ,setCookie,deleteCookie } from 'cookies-next';
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { refresh } from '../api/login/route';
import {useRouter} from 'next/navigation';
import handler from '../api/home/route'

export default function GitRepo() {
   const router=useRouter();
  const [select, setSelect] = useState('');
  const [value, setValue] = useState('');

  const token = getCookie('accesstoken');
  const user = getCookie('User');
  const name = getCookie('Name');

  useEffect(() => {
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
                  router.push('/login')
              }
          })
    }
  }, []);
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
     event.preventDefault();
       handler(select,value,String(user)).then((res)=>{
          console.log(res)
          if(res.status==200){
            router.push('/hosting');
          }
          else 
           router.push('/');
        }
        )

    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('/assets/bgHome.png')] bg-[#C2DAFB]" > 
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">     
       <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center  w-4/5 ">

    <div className="p-8 flex flex-col items-center"> 

        <div className="flex flex-row  items-center  justify-center text-2xl font-sans font-extrabold">
        <Image className='w-auto' src="/assets/logo.png" width={150} height={150} alt="Xerocodee" />
        </div>

        <div className="py-3 ">

            <h2 className="text-3xl font-bold mb-2">
            Welcome {name ? `${name}` : "Arya Soni"} !
            </h2>

            <div className=" flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-2 text-xs font-bold text-gray-400">Github Repository List</span>
            <div className="flex-grow border-t border-gray-400"></div>
            </div>

              
        </div>


       </div>
      
            <div className='w-3/5 pt-4  pb-20'>
            <div className='flex items-start pt-4 pl-2 pb-28 border border-[#C0C0C0]  rounded-md '>
             <div className='text-left'> 
            <h2>portfolio(private) alen-eng</h2>
            <h2 className='text-md font-semibold'><span className='text-lg font-extrabold'>my_app(public)</span> alen-eng</h2>
            <h2></h2>
             </div> 
            </div>
            </div>

        </div>
       </main>
      </div>
  )
}