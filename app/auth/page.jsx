"use client"

import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import Image from 'next/image';
import React from 'react'

function Login() {

     /**
      * Used to SignIn with Google
     */
     const signInWithGoogle = async () => {
          const {error} = await supabase.auth.signInWithOAuth({
               provider: 'google',
               options: {
                    redirectTo: `${location.origin}/dashboard` // redirect to /dashboard after login
               }
          })

          if (error) {
               console.error('Error', error.message)
          }
     }

     return (
          <div className = 'flex flex-col items-center justify-center h-screen bg-[#041933]'>
               <div className = "flex flex-col items-center sm:border rounded-2xl p-8">
                    <Image src = {'/logo4.svg'} alt = 'logo' 
                         width = {400} 
                         height={100}
                         className='w-[180px] mb-2'
                    />
                    <div className='flex flex-col items-center'>
                         <Image src = {'/login.jpg'} alt = 'login'
                              width = {600}
                              height = {400}
                              className = 'w-[400px] h-[250px] rounded-2xl'
                         />
                         <h2 className = "text-2xl font-bold text-center mt-5 text-white">Welcome to AiCruiter</h2>
                         <p className = "text-gray-300 text-center">Sign in with Google</p>
                         <Button className='mt-7 w-full'
                              onClick = {signInWithGoogle}     
                         >
                              Login with Google
                         </Button>
                    </div>
               </div>
          </div>
     )
}

export default Login;