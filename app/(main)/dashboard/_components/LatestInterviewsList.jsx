"use client"; // If we are using hooks, we need to 'use client' component
import { Button } from '@/components/ui/button';
import { Camera, Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

function LatestInterviewsList() {

     const [interviewList, setInterviewList] = useState([]);

     return (
          <div className = "my-5">
               <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

               {
                    interviewList?.length === 0 
                    && 
                    <div className='p-5 flex flex-col gap-3 items-center mt-5'>
                         <Video className = "h-10 w-10 text-primary" />
                         <h2>You havn't created any interview yet!</h2>
                         {/* <Button>+ Create new Interview</Button> */}
                         <Link href={'/dashboard/create-interview'}>
                              <Button>+ Create new Interview</Button>
                         </Link>
                    </div>
               }
          </div>
     )
}

export default LatestInterviewsList