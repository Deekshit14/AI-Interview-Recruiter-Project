import React from 'react'
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';


function CandidateFeedbackDialog({ candidate }) {

     const calculateAverageRating = (rating) => {
          if (!rating) return 0;
          const values = Object.values(rating);
          const total = values.reduce((sum, val) => sum + val, 0);
          return (total / values.length).toFixed(1);
     }

     const technicalSkills = candidate?.feedback?.feedback?.rating.technicalSkills;
     const communication = candidate?.feedback?.feedback?.rating.communication;
     const experience = candidate?.feedback?.feedback?.rating.experience;
     const problemSolving = candidate?.feedback?.feedback?.rating.problemSolving;
     const summary = candidate?.feedback?.feedback?.summary;
     const recommendation = candidate?.feedback?.feedback?.Recommendation || candidate?.feedback?.feedback?.recommendation;
     const recommendationMsg = candidate?.feedback?.feedback?.RecommendationMsg || candidate?.feedback?.feedback?.recommendation;
     

     return (
          <Dialog>
               <DialogTrigger asChild>
                    <Button variant='outline' className='text-primary'>View Report</Button>
               </DialogTrigger>
               <DialogContent className = "max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                         <DialogTitle>Feedback</DialogTitle>
                         <DialogDescription asChild>
                              <div className='mt-5'>
                                   <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                                        <div className='flex sm:items-center gap-5'>
                                             <h2 className='bg-primary p-3 px-4.5 font-bold text-white uppercase rounded-full'>{candidate.userName[0]}</h2>
                                             <div>
                                                  <h2 className='font-bold capitalize'>{candidate?.userName}</h2>
                                                  <h2 className='text-xs sm:text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                             </div>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                             <h2 className='text-primary mt-2 text-lg sm:text-2xl font-bold'>{calculateAverageRating(candidate?.feedback?.feedback?.rating)} / 10</h2>
                                        </div>
                                   </div>

                                   <div className='mt-5'>
                                        <h2 className='font-bold'>Skills Assessment</h2>
                                        <div className='mt-3 grid sm:grid-cols-2 gap-6 sm:gap-10'>
                                             <div>
                                                  <h2 className='flex justify-between'>Technical Skills: <span>{technicalSkills}/10</span></h2>
                                                  <Progress value={technicalSkills * 10} className='mt-1' />
                                             </div>
                                             <div>
                                                  <h2 className='flex justify-between'>Communication Skills: <span>{communication}/10</span></h2>
                                                  <Progress value={communication * 10} className='mt-1' />
                                             </div>
                                             <div>
                                                  <h2 className='flex justify-between'>Experience Skills: <span>{experience}/10</span></h2>
                                                  <Progress value={experience * 10} className='mt-1' />
                                             </div>
                                             <div>
                                                  <h2 className='flex justify-between'>ProblemSolving Skills: <span>{problemSolving}/10</span></h2>
                                                  <Progress value={problemSolving * 10} className='mt-1' />
                                             </div>
                                        </div>
                                   </div>

                                   <div className='mt-5'>
                                        <div className='p-5 bg-secondary my-3 rounded-md '>
                                             <h2 className='font-bold text-center mb-2'>Performance summary</h2>
                                             <p className='sm:text-justify'>{summary}</p>
                                        </div>
                                   </div>

                                   <div className={`p-5 mt-10 rounded-md ${recommendation === 'no' ? 'bg-red-100' : 'bg-green-100'}`}>
                                        <h2 className={`font-bold ${recommendation === 'no' ? 'text-red-700' : 'text-green-700'}`}>Recommendation Status: </h2>
                                        <p className={`mt-1 sm:text-justify ${recommendation === 'no' ? 'text-red-500' : 'text-green-500'}`}>{recommendationMsg}</p>
                                   </div>
                              </div>
                         </DialogDescription>
                    </DialogHeader>
               </DialogContent>
          </Dialog>

     )
}

export default CandidateFeedbackDialog