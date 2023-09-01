
"use client";

import { getCookie ,setCookie,deleteCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import handler from '../api/signup/route'
import { useRouter } from 'next/navigation';
import { googleHandler, refresh ,githubHandler } from '../api/login/route';
import { signIn, useSession } from 'next-auth/react';

export default function Signup () {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmPassword] = useState('');
  const router=useRouter();

  const token = getCookie('accesstoken');
  const user = getCookie('User');
  const {status , data: session } = useSession();
  
   useEffect(() => {
  if(token ){
    router.replace('/')
}
else if(!token && !user){
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
                  router.replace('/')
            }
            else{
                router.replace('/login')
            }
        })
  }
   }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(password!=Confirmpassword){
      alert("Password and Confirm Password are not same")
      return
    }
    else if(password.length<8){
      alert("Password length should be greater than 8")
      return
    }
    else
      handler(firstname,lastname,email,password).then((res)=>{
        console.log(res)
        if(res.status==200){
          router.push('/login');
        }
      }
      )
  }

  const handleGoogle = async (event:any) => {
    signIn("google",{callbackUrl:'https://xero-codee-three.vercel.app'})
    event.preventDefault()
   googleHandler(String(session?.user?.name)  , String(session?.user?.email)).then((res)=>{
      const result =JSON.parse(JSON.stringify(res))
      setCookie('accesstoken',result.accesstoken,{
         maxAge:60*5,
         path:'/'   
      })
      setCookie('User',result.User,{
         maxAge:60*60*24*30*12,
         path:'/'   
      })
      setCookie('Name',result.name,{
         maxAge:60*60*24*30*12,
         path:'/'
      })
   })
       
  }

  const handleGithub = async (event: any) => {
      signIn("github",{callbackUrl:'https://xero-codee-three.vercel.app'})
      event.preventDefault()
      githubHandler(String(session?.user?.name)  , String(session?.user?.email)).then((res)=>{
         const result =JSON.parse(JSON.stringify(res))
         setCookie('accesstoken',result.accesstoken,{
            maxAge:60*5,
            path:'/'   
         })
         setCookie('User',result.User,{
            maxAge:60*60*24*30*12,
            path:'/'   
         })
         setCookie('Name',result.name,{
            maxAge:60*60*24*30*12,
            path:'/'
         })
      })
   }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-200" > 
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">     
       <div className="bg-white  rounded-tr-3xl rounded-bl-3xl shadow-2xl flex w-2/3 divide-x max-w-4xl">

       <div className=" w-3/5 p-8">

         <div className="flex flex-row items-center  justify-center text-2xl font-sans font-extrabold">

            <Image className='w-auto' src="/assets/logo.png" width={150} height={150} alt="Xerocodee" />
         </div>

         <div className="py-3">
          <h2 className="text-3xl text-black font-bold mb-2">
            Hello!
            </h2>

            <div className="relative flex py-2 items-center">
    <div className="flex-grow border-t border-gray-400"></div>
    <span className="flex-shrink mx-1 text-xs font-bold text-gray-400">Create Your Account</span>
    <div className="flex-grow border-t border-gray-400"></div>
</div>
          {/* <div className="border-2 text-sm font-extralight inline-block mb-2"><span>create your account</span></div> */}
          <div className="flex justify-center my-2">
             </div>

             <form onSubmit={handleSubmit} method='post'>
             <div className="flex flex-col items-center">

              <div className="border rounded-md w-full p-2 flex items-center mb-3"> 
                <input type="text" required={true} name="First Name" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} className="pl-2 outline-none font-medium text-xs text-black
                flex-1" />
                </div>

                <div className=" border rounded-md w-full p-2 flex items-center mb-3">
                <input type="text" required={true} name="Last Name" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} className="pl-2 outline-none font-medium text-xs text-black
                flex-1" />
                </div>

                <div className="border rounded-md w-full p-2 flex items-center mb-3"> 
                <input type="email" required={true} name="Email-Id" placeholder="Email-Id" onChange={(event) => setEmail(event.target.value)} className="pl-2 outline-none font-medium text-xs
                flex-1" />
                </div>

                <div className=" border rounded-md w-full p-2 flex items-center mb-3">
                <input type="password" required={true} name="Password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} className="pl-2 outline-none font-medium text-xs
                flex-1" />
                </div>

                <div className=" border rounded-md w-full p-2 flex items-center mb-3">
                <input type="password" required={true} name="Confirm Password" placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)} className="pl-2 outline-none font-medium text-xs
                flex-1" />
                </div>

                 <button
                 type='submit'
                  className="bg-[#1F64FF] w-full text-white rounded-full px-12 py-2 inline-block font-semibold hover:opacity-90
                  hover:text-white "
                  >Sign Up</button>

                  <h4 className='text-gray-400 text-sm font-bold pt-4'>OR</h4>

                  <div className='flex gap-4 pt-6'>
                  <button
                  type='submit'
                  className="bg-white flex flex-row items-center gap-1 rounded-md text-gray-400 font-medium border text-xs px-2 py-2 
                  hover:opacity-90 "
                  onClick={handleGoogle}
                  >SignUp with Google <Image height={25} width={25} alt='G' src={'/assets/g.png'}/></button>
                  <button
                  type='submit'
                  className="bg-white flex flex-row items-center gap-1 rounded-md text-gray-400 font-medium text-xs border px-2 py-2 
                  hover:opacity-90 "
                  onClick={handleGithub}
                  >SignUp with Github <Image height={25} width={25} alt='G' src={'/assets/git.png'}/></button>
                  </div>
                 <p className='text-sm pb-1 pt-8'>Already have an account ? <Link className='text-[#1F63FF] font-normal' href={'/login'}>LOGIN</Link></p>
             </div>
             </form>
          </div>       
      </div>
        
       <div className="w-3/5  relative text-white rounded-tr-2xl rounded-br-2xl px-16 py-36">
        
        <Image className='w-full' src={'/assets/dev.jpg'} width={500} height={500} alt='img'/>
             <div className="custom-shape-divider-bottom-1692514955">
           <svg xmlns="/assets/wave.svg" viewBox="0 0 1440 320" preserveAspectRatio='none'><path fill="#1F64FF" fillOpacity="1"
            d="M0,320L60,293.3C120,267,240,213,360,202.7C480,192,600,224,720,240C840,256,960,256,1080,218.7C1200,181,1320,107,1380,69.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" className='shape-fill'>
              </path>
              </svg>
           
           </div>   
             
        </div>    
        </div>
       </main>
      </div>
  )
}


