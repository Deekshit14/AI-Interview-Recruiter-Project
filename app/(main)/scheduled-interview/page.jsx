"use client";
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';

function ScheduledInterview() {
     const { user } = useUser();
     const [interviewList, setInterviewList] = useState([]);

     useEffect(() => {
          user && GetInterviewList();
     }, [user])

     const GetInterviewList = async () => {
          // const result = await supabase
          let { data: Interviews, error } = await supabase
               .from('Interviews')
               .select('jobPosition, duration, interview_id, interview-feedback(userEmail)')
               .eq('userEmail', user?.email)
               .order('id', { ascending: false });

          // console.log('Result is', result.data)
          // setInterviewList(result.data);
          console.log(Interviews);
          setInterviewList(Interviews);
     }

     return (
          <div className='mt-10'>
               <h2 className='font-bold text-2xl text-white'>Interview List with Candidate Feedback</h2>
               {
                    interviewList?.length === 0
                    &&
                    <div className='p-5 flex flex-col gap-3 items-center mt-10'>
                         <Video className="h-10 w-10 text-primary" />
                         <h2 className='text-white text-center'>You havn't created any interview yet!</h2>
                         {/* <Button>+ Create new Interview</Button> */}
                         <Link href={'/dashboard/create-interview'}>
                              <Button className='text-white'>+ Create new Interview</Button>
                         </Link>
                    </div>
               }

               {
                    interviewList
                    &&
                    <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                         {interviewList.map((interview, index) => (
                              <InterviewCard interview={interview} key={index} viewDetail = {true} />
                         ))}
                    </div>
               }
          </div>
     )
}

export default ScheduledInterview