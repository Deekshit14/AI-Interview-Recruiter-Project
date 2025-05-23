import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({ candidateList }) {

     const calculateAverageRating = (rating) => {
          if (!rating) return 0;
          const values = Object.values(rating);
          const total = values.reduce((sum, val) => sum + val, 0);
          return (total / values.length).toFixed(1);
     }

     return (
          <div>
               <h2 className='font-bold my-5 text-white'>Candidates ({candidateList?.length})</h2>
               {candidateList?.map((candidate, index) => (
                    <div key = {index} className='p-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between  rounded-lg mt-2 bg-blue-50'>
                         <div className='flex items-center gap-5'>
                              <h2 className='bg-primary p-3 px-4.5 font-bold text-white text-transform: uppercase rounded-full'>{candidate.userName[0]}</h2>
                              <div>
                                   <h2 className='font-bold text-transform: capitalize'>{candidate?.userName}</h2>
                                   <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate?.created_at).format('MMM DD, yyyy')}</h2>
                              </div>
                         </div>
                         <div className='flex gap-3 items-center'>
                              {/* <h2 className='text-green-600'>{candidate?.feedback.rating?.communication}</h2> */}
                              {calculateAverageRating(candidate?.feedback?.feedback?.rating)} / 10
                         </div>
                         <CandidateFeedbackDialog candidate = {candidate} />
                    </div>
               ))}
          </div>
     )
}

export default CandidateList