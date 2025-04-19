import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview }) {
     const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;

     const copyLink = () => {
          navigator.clipboard.writeText(url);
          toast('Copied')
     }


     const onSend = () => {
          // window.location.href = `mailto:${interview?.userEmail}?subject=Interview Link&body=${url}`;
          const to = interview?.userEmail;
          const s = interview?.jobPosition
          const subject = encodeURIComponent(`Interview Link on ${s}`);
          const body = encodeURIComponent(`Hi,\n\nHere is your interview link:\n${url}`);

          const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`;
          window.open(gmailUrl, '_blank'); // Opens in a new tab
     }


     return (

          <div className='p-5 bg-white rounded-lg border'>
               <div className='flex items-center justify-between'>
                    <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
                    <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
               </div>
               <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
               <h2 className='mt-2'>{interview?.duration}</h2>

               {/* Wrap buttons in a container with min-w-0 to allow shrinking */}
               <div className='flex gap-3 w-full mt-5 min-w-0'>
                    <Button
                         variant='outline'
                         className='flex-1 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis'
                         onClick={copyLink}
                    >
                         <Copy className="w-4 h-4" />
                         Copy Link
                    </Button>

                    <Button
                         className='flex-1 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis'
                         onClick={onSend}
                    >
                         <Send className="w-4 h-4" />
                         Send
                    </Button>
               </div>
          </div>

     )
}

export default InterviewCard;






// <div className='p-5 bg-white rounded-lg border'>
//      <div className='flex items-center justify-between'>
//           <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
//           <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
//      </div>
//      <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
//      <h2 className='mt-2'>{interview?.duration}</h2>
//      {/* <div className='flex gap-3 w-full mt-5'>
//           <Button variant='outline'> <Copy /> Copy Link</Button>
//           <Button > <Send /> Send</Button>
//      </div> */}
//      <div className='flex gap-3 w-full mt-5'>
//           <Button variant='outline' className='w-full flex items-center justify-center gap-2'>
//                <Copy className="w-4 h-4" />
//                Copy Link
//           </Button>
//           <Button className='w-full flex items-center justify-center gap-2'>
//                <Send className="w-4 h-4" />
//                Send
//           </Button>
//      </div>
// </div>