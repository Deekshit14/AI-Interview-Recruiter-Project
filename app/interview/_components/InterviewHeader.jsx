import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
     return (
          <div className='p-4 shadow-sm bg-[#051029]'>
               <Image src = {'/logo4.svg'} alt = "logo" width = {200} height = {100} 
                    className = 'w-[140px]' 
               />
          </div>
     )
}

export default InterviewHeader