"use client";  // If we are using hooks, we need to 'use client' component
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

 

function AllInterview() {
     const [interviewList, setInterviewList] = useState([]);
     const { user } = useUser();

     useEffect(() => {
          user && GetInterviewList();
     }, [user])

     const GetInterviewList = async () => {
          let { data: Interviews, error } = await supabase
               .from('Interviews')
               .select('*, interview-feedback(userEmail)')
               .eq('userEmail', user?.email)
               .order('id', { ascending: false });

          console.log(Interviews);
          setInterviewList(Interviews);
     }


     return (
          <div className="my-5">
               <h2 className='font-bold text-2xl text-white'>All Previously Created Interviews</h2>

               {
                    interviewList?.length === 0
                    &&
                    <div className='p-5 flex flex-col gap-3 items-center mt-5'>
                         <Video className="h-10 w-10 text-primary" />
                         <h2 className="text-white text-center">You havn't created any interview yet!</h2>
                         {/* <Button>+ Create new Interview</Button> */}
                         <Link href={'/dashboard/create-interview'}>
                              <Button className="text-white">+ Create new Interview</Button>
                         </Link>
                    </div>
               }

               {
                    interviewList
                    &&
                    <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                         {interviewList.map((interview, index) => (
                              <InterviewCard interview={interview} key={index} />
                         ))}
                    </div>
               }

          </div>
     )
}

export default AllInterview