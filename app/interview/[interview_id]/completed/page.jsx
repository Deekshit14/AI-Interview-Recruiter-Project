"use client";
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

function InterviewComplete() {
     const { interview_id } = useParams();
     const { user } = useUser();
     const [feedbackDetail, setFeedbackDetail] = useState(null);
     const [interviewDetails, setInterviewDetails] = useState();

     useEffect(() => {
          user && GetInterviewDetail();
     }, [user]);

     const GetInterviewDetail = async () => {
          const { data: Interviews, error } = await supabase
               .from('Interviews')
               .select(`
                    jobPosition, jobDescription, type, questionList, duration, interview_id, created_at,
                    interview-feedback(userEmail, userName, feedback, created_at)
               `)
               .eq('interview_id', interview_id)
               .eq('userEmail', user?.email)
               .maybeSingle(); // We expect one interview record, but multiple feedbacks

          if (error) {
               console.error("Error fetching interview details:", error);
               return;
          }

          if (Interviews) {
               setInterviewDetails(Interviews);
               console.log(Interviews);

               // Sort feedbacks by created_at descending and pick the latest
               const sortedFeedbacks = Interviews["interview-feedback"]
                    ?.filter(fb => fb.userEmail === user.email)
                    ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

               if (sortedFeedbacks?.length > 0) {
                    setFeedbackDetail(sortedFeedbacks[0]);
               } else {
                    console.warn("No matching feedback found.");
               }
          }
     };



     const calculateAverageRating = (rating) => {
          if (!rating) return 0;
          const values = Object.values(rating);
          const total = values.reduce((sum, val) => sum + val, 0);
          return (total / values.length).toFixed(1);
     }

     if (!feedbackDetail) {
          return <div className="mt-5 text-gray-600">Loading feedback...</div>;
     }

     const technicalSkills = feedbackDetail?.feedback?.feedback?.rating?.technicalSkills ?? 0;
     const communication = feedbackDetail?.feedback?.feedback?.rating?.communication ?? 0;
     const experience = feedbackDetail?.feedback?.feedback?.rating?.experience ?? 0;
     const problemSolving = feedbackDetail?.feedback?.feedback?.rating?.problemSolving ?? 0;
     const summary = feedbackDetail?.feedback?.feedback?.summary ?? "";
     const recommendation = feedbackDetail?.feedback?.feedback?.Recommendation || feedbackDetail?.feedback?.feedback?.recommendation;
     const recommendationMsg = feedbackDetail?.feedback?.feedback?.RecommendationMsg || feedbackDetail?.feedback?.feedback?.recommendationMsg;

     return (
          <div className='mt-2 p-4 sm:p-10'>
               <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                    <div className='flex sm:items-center gap-5'>
                         <h2 className='bg-primary p-3 px-4.5 font-bold text-white uppercase rounded-full'>
                              {feedbackDetail?.userName?.[0]}
                         </h2>
                         <div>
                              <h2 className='font-bold capitalize text-white'>{feedbackDetail?.userName}</h2>
                              <h2 className='text-xs sm:text-sm text-gray-300'>{feedbackDetail?.userEmail}</h2>
                         </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                         <h2 className='text-primary mt-2 text-lg sm:text-2xl font-bold'>
                              {calculateAverageRating(feedbackDetail?.feedback?.feedback?.rating)} / 10
                         </h2>
                    </div>
               </div>

               <div className='mt-5'>
                    <h2 className='font-bold text-white'>Skills Assessment</h2>
                    <div className='mt-3 grid sm:grid-cols-2 gap-6 sm:gap-10'>
                         <div>
                              <h2 className='flex justify-between text-white'>Technical Skills: <span>{technicalSkills}/10</span></h2>
                              <Progress value={technicalSkills * 10} className='mt-1' />
                         </div>
                         <div>
                              <h2 className='flex justify-between text-white'>Communication Skills: <span>{communication}/10</span></h2>
                              <Progress value={communication * 10} className='mt-1' />
                         </div>
                         <div>
                              <h2 className='flex justify-between text-white'>Experience Skills: <span>{experience}/10</span></h2>
                              <Progress value={experience * 10} className='mt-1' />
                         </div>
                         <div>
                              <h2 className='flex justify-between text-white'>Problem Solving Skills: <span>{problemSolving}/10</span></h2>
                              <Progress value={problemSolving * 10} className='mt-1' />
                         </div>
                    </div>
               </div>

               <div className='mt-10'>
                    <div className='p-5 bg-secondary my-3 rounded-md '>
                         <h2 className='font-bold text-center mb-2'>Performance Summary</h2>
                         <p className='text-sm sm:text-base text-justify'>{summary}</p>
                    </div>
               </div>

               <div className={`p-5 mt-8 rounded-md ${recommendation === 'no' ? 'bg-red-100' : 'bg-green-100'}`}>
                    <h2 className={`font-bold ${recommendation === 'no' ? 'text-red-700' : 'text-green-700'}`}>
                         Recommendation Status:
                    </h2>
                    <p className={`mt-1 text-sm sm:text-base text-justify ${recommendation === 'no' ? 'text-red-500' : 'text-green-500'}`}>
                         {recommendationMsg}
                    </p>
               </div>
          </div>

     );
}

export default InterviewComplete;