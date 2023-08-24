
"use client";
import { getCookie ,setCookie,deleteCookie } from 'cookies-next';
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { refresh } from './api/login/route';
import {useRouter} from 'next/navigation';
import handler from './api/home/route'

export default function Home() {
   const router=useRouter();
  const [select, setSelect] = useState('');
  const [value, setValue] = useState('');

  const token = getCookie('accesstoken');
  const user = getCookie('User');
  const name = getCookie('Name');

  if(!token && !user){
      router.push('/signup')
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
                deleteCookie('Name')
                  router.push('/login')
              }
          })
    }
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
    <span className="flex-shrink mx-1 text-xs font-bold text-gray-400">Choose from the following .</span>
    <div className="flex-grow border-t border-gray-400"></div>
</div>


<div className='flex flex-row xl:space-x-60 lg:space-x-32 md:space-x-20 sm:space-x-10 pt-8 pb-24'>
             <button
                  type='submit'
                  {...select=='Developer' ? {className:"bg-[#1F64FF] flex flex-row items-center gap-1 rounded-md text-white font-semibold text-sm border px-8 py-2 hover:opacity-90"} 
                  : {className:"bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-8 py-2 "}
                    }
                    onClick={()=>{if(select=='Developer') setSelect('') 
                                   else setSelect('Developer')}}
                  >Developer</button>
              <button
                  type='submit'
                    {...select=='Organisation' ? {className:"bg-[#1F64FF] flex flex-row items-center gap-1 rounded-md text-white font-semibold text-sm border px-8 py-2 hover:opacity-90"}
                     : {className:"bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-8 py-2 "}
                      } 

                    onClick={()=>{if(select=='Organisation') setSelect('')
                                else setSelect('Organisation')}}
                  >Organisation</button>
              <button
                  type='submit'
                    {...select=='Company' ? {className:"bg-[#1F64FF] flex flex-row items-center gap-1 rounded-md text-white font-semibold text-sm border px-8 py-2 hover:opacity-90"}
                     : {className:"bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-8 py-2 "}
                       }
                  onClick={()=>{if(select=='Company') setSelect('')
                                else setSelect('Company')}}
                  >Company</button>
 </div>
       
</div>
{select && (
             <form onSubmit={handleSubmit} className='pb-16  w-3/5 ' method='post'>
             <div className="flex flex-row items-center">
             {select=='Developer' ?
                <div className="border rounded-md w-full p-2  "> 
                <input type="text" name="Text" required={true} placeholder="Developer Name" onChange={(event) => setValue(event.target.value)} className="text-black outline-none font-medium text-sm
                flex-1" />
                </div> 
                : select=='Organisation' ?
                <div className="border rounded-md w-full p-2  "> 
                <input type="text" name="Text" required={true} placeholder="Organization Name" onChange={(event) => setValue(event.target.value)} className="text-black outline-none font-medium text-sm
                flex-1" />
                </div> 
                : select=='Company' ?
                <div className="border rounded-md w-full p-2  "> 
                <input type="text" name="Text" required={true} placeholder="Company Name" onChange={(event) => setValue(event.target.value)} className="text-black outline-none font-medium text-sm
                flex-1" />
                </div> :""
                    }
                <button
                 type='submit'
                  className="bg-[#1F64FF] ml-6  text-white rounded-md px-8 py-2  font-semibold hover:opacity-90"
                  >Submit</button>

              
              </div>
              </form>
)
}
            </div>   
     
      
        </div>
       </main>
      </div>
  )
}
