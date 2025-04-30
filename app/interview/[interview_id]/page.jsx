"use client";
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { useUser } from '@/app/provider';

function Interview() {

     const { interview_id } = useParams();
     // console.log(interview_id);
     const [interviewData, setInterviewData] = useState();
     const [userName, setUserName] = useState();
     const [userEmail, setUserEmail] = useState();
     const [loading, setLoading] = useState(false);
     const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
     const router = useRouter();
     const { user } = useUser();

     
     useEffect(() => {
          interview_id && GetInterviewDetails();
          setUserEmail(user?.userEmail);
     }, [interview_id]);

     useEffect(() => {
          if (user?.email) {
               setUserEmail(user.email);
          }
     }, [user]);

     const GetInterviewDetails = async () => {
          setLoading(true);
          try {
               let { data: Interviews, error } = await supabase
                    .from('Interviews')
                    .select("jobPosition, jobDescription, duration, type")
                    .eq('interview_id', interview_id)

               setInterviewData(Interviews[0])
               setLoading(false);

               if (Interviews?.length === 0) {
                    toast('Incorrect Interview link');
                    return
               }
          }
          catch (e) {
               setLoading(false);
               toast('Incorrect Interview link')
          }
     }
        


     const onJoinInterview = async () => {
          setLoading(true);
          let { data: Interviews, error } = await supabase
               .from('Interviews')
               .select('*')
               .eq('interview_id', interview_id);

          console.log(Interviews[0]);
          setInterviewInfo({
               userName: userName,
               userEmail: userEmail,
               interviewData: Interviews[0]
          });
          router.push('/interview/' + interview_id + '/start')
          setLoading(false);
     }


     return (
          <div className='px-3 sm:px-10 md:px-28 lg:px-48 xl:px-64 mt-7'>
               {/* <InterviewHeader /> */}
               <div className="flex flex-col items-center justify-center border rounded-lg bg-[#e2e2ff] p-7 lg:px-32 xl:px-52 pb-20">
                    <Image src={'/logo4.svg'} alt="logo" width={200} height={100}
                         className='w-[140px]'
                    />
                    <h2 className='mt-1 text-gray-400 text-center'>AI-Powered Interview Platform</h2>

                    <Image src={'/interview.png'} alt='interview' width={500} height={500}
                         className='w-[280px] my-6'
                    />

                    <h2 className='font-bold text-xl text-center'>{interviewData?.jobPosition} (Interview)</h2>
                    <h2 className='flex gap-2 items-center text-gray-500 mt-3'>
                         <Clock className='h-4 w-4' />
                         {interviewData?.duration}
                    </h2>

                    <div className='w-full mt-3'>
                         <h2>Enter your name</h2>
                         <Input className="bg-white mt-1" placeholder='e.g. Deekshit' onChange={(event) => setUserName(event.target.value)} />
                    </div>

                    {/* <div className='w-full mt-3'>
                         <h2>Enter your Email</h2>
                         <Input type="email" placeholder='e.g. deekshit@gmail.com' 
                         onChange={(event) => setUserEmail(event.target.value)} />
                    </div> */}

                    <div className='sm:p-3 bg-blue-100 flex gap-4 rounded-lg mt-7'>
                         <Info className='text-primary' />
                         <div>
                              <h2 className='font-bold'>Before you begin</h2>
                              <ul>
                                   <li className='text-sm text-primary'>- Test your Microphone</li>
                                   <li className='text-sm text-primary'>- Ensure you have a stable internet connection</li>
                                   <li className='text-sm text-primary'>- Find a Quiet place for interview</li>
                              </ul>
                         </div>
                    </div>

                    <Button className={'mt-5 w-full font-bold'} disabled={loading || !userName || !userEmail}
                         onClick={() => onJoinInterview()}
                    >
                         <Video />
                         {loading && <Loader2Icon />}
                         Join Interview
                    </Button>

               </div>
          </div>
     )
}

export default Interview