"use client";
import { getCookie ,setCookie,deleteCookie } from 'cookies-next';
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react';
import {useRouter} from 'next/navigation';
import { githubHandler, refresh } from '../api/login/route';
import { optionHandler, userFetch } from '../api/home/route';
import { signIn ,useSession } from 'next-auth/react';

function Platform() {
   const router=useRouter();
  const [select, setSelect] = useState('');
  const [value, setValue] = useState('');
  const token = getCookie('accesstoken');
  const user = getCookie('User');
  const name = getCookie('Name');
  const Gituser = getCookie('Gituser');
  const {status , data: session } = useSession();
  useEffect(() => {
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
  if(Gituser){
    router.push('/gitrepo')
  }
}, []);

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
      const handleGithub = async (event: any) => {
        signIn("github",)
        event.preventDefault()
        const userId = session?.user?.image?.slice(40,-4);
        userFetch(String(userId)).then((res)=>{
          console.log(res)
          const result =JSON.parse(JSON.stringify(res))
          setCookie('Gituser',result.login,{
                    maxAge:60*2,
                    path:'/'   
                  })
        })
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
          <h2 className="text-3xl text-black font-bold mb-2">
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
              <button
                  type='submit'
                  className="bg-white flex flex-row items-center gap-1 rounded-md text-black font-semibold text-sm border px-20 py-2 hover:bg-[#1F64FF] hover:text-white "
                  onClick={handleGithub}
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