"use client";
import { getCookie ,setCookie,deleteCookie } from 'cookies-next';
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import {useRouter} from 'next/navigation';
import { refresh } from '../api/login/route';
import { optionHandler } from '../api/home/route';


function Platform() {
   const router=useRouter();
  const [select, setSelect] = useState('');
  const [value, setValue] = useState('');
  const token = getCookie('accesstoken');
  const user = getCookie('User');
  const name = getCookie('Name');
  // const nextToken =  getCookie("next-auth.session-token");
  // console.log(nextToken)
  // if(!token){
  //     router.push('/login')
  // }

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
                router.push('/login')
            }
        })
  }

  const handleEvent = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      optionHandler(select,value,String(user)).then((res)=>{
         console.log(res)
         if(res.status==200){
           router.push('/gitrepo');
         }
       }
       )
   }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('/assets/bgHome.png')] bg-[#C2DAFB] " > 
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


<div className='flex flex-row xl:space-x-96 lg:space-x-64 md:space-x-36 sm:space-x-20  pt-10 pb-24'>
             <button
                  type='submit'
                  className="bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-16 py-2 hover:bg-[#1F64FF] hover:text-white "
                  onClick={()=>{if(select=='AWS') setSelect('')
                                else setSelect('AWS')}}
                  >AWS Cloud</button>
              {/* <button
                  type='submit'
                    {...select=='Organisation' ? {className:"bg-[#1F64FF] flex flex-row items-center gap-1 rounded-md text-white font-semibold text-sm border px-8 py-2 hover:opacity-90"}
                     : {className:"bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-8 py-2 "}
                      } 

                    onClick={()=>{if(select=='Organisation') setSelect('')
                                else setSelect('Organisation')}}
                  >Organisation</button> */}
              <button
                  type='submit'
                  className="bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-20 py-2 hover:bg-[#1F64FF] hover:text-white "
                  onClick={()=>{if(select=='Github') setSelect('')
                                else setSelect('Github')}}
                  >Github</button>
 </div>
       
</div>
 {select =='Github' && (
             <form onSubmit={handleEvent} className='pb-16  w-3/5 ' method='post'>
             <div className="flex flex-row items-center">
                <div className="border rounded-md w-full p-2  "> 
                <input type="text" name="Text" placeholder="Github Repository" onChange={(event) => setValue(event.target.value)} className="text-black outline-none font-medium text-sm
                " />
                </div>  
                <button
                 type='submit'
                  className="bg-[#1F64FF] ml-6  text-white rounded-md px-8 py-2  font-semibold hover:opacity-90"
                  // onSubmit={(event)=>{event.preventDefault(); router.push('/hosting')}}
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

export default Platform