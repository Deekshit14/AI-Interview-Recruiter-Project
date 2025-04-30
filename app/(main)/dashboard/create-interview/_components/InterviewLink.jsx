import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, MessageCircle, Plus } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

function InterviewLink({ interview_id, formData }) {

     const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;

     const GetInterviewUrl = () => {
          return url;
     }


     const { user } = useUser();
     const onCopyLink = async () => {
          await navigator.clipboard.writeText(url);
          toast('Link copied')
     }

     const onSend = () => {
          // window.location.href = `mailto:${interview?.userEmail}?subject=Interview Link&body=${url}`;
          const to = user?.email;
          const s = formData?.jobPosition
          const subject = encodeURIComponent(`Interview Link on ${s}`);
          const body = encodeURIComponent(`Hi,\n\nHere is your interview link:\n${url}`);

          const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`;
          window.open(gmailUrl, '_blank'); // Opens in a new tab
     }


     const onWhatsapp = () => {
          const s = formData?.jobPosition;
          const message = `Hi,\n\nHere is your interview link for the position of ${s}:\n${url}`;
          const encodedMessage = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
          window.open(whatsappUrl, '_blank'); // Opens WhatsApp in a new tab
     };



     return (
          <div className='flex flex-col items-center justify-center mt-10'>
               <Image src={'/check.webp'} alt='check' width={200} height={200}
                    className='w-[50px] h-[50px]'
               />
               <h2 className="font-bold text-lg mt-4 text-white">Your AI Interview is Ready!</h2>
               <p className='mt-1 text-white text-center'>Share this link with your candidates to start the interview process</p>

               <div className='w-full p-7 mt-6 rounded-lg bg-white'>
                    <div className="flex justify-between items-center">
                         <h2 className='font-bold'>Interview Link</h2>
                         <h2 className='p-1 px-2 text-xs sm:text-sm text-primary bg-blue-50 rounded-2xl'>Valid for 30 days</h2>
                    </div>
                    <div className='mt-3 flex gap-3 items-center'>
                         <Input defaultValue={GetInterviewUrl()} disabled={true} className="bg-blue-50" />
                         {/* <Button onClick = {() => onCopyLink()}> <Copy /> Copy link </Button> */}
                         <Button onClick={() => onCopyLink()} className="flex items-center gap-2">
                              <Copy className="w-4 h-4" />
                              <span className="hidden sm:inline">Copy link</span>
                         </Button>
                    </div>
                    <hr className='my-5' />

                    <div className='flex gap-5'>
                         <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
                              <Clock className='h-4 w-4' />{formData?.duration}
                         </h2>
                         <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
                              <List className='h-4 w-4' /> 10 Question
                         </h2>
                         {/* <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
                              <Calendar className='h-4 w-4' />30Min{formData?.duration} 
                         </h2> */}
                    </div>
               </div>

               <div className='mt-7 bg-white p-5 rounded-lg w-full'>
                    <h2 className='font-bold'>Share Via</h2>
                    <div className='flex gap-7 mt-2'>
                         <Button variant={'outline'} className='bg-blue-50' onClick={onSend}> <Mail /> Email</Button>
                         <Button variant={'outline'} className='bg-blue-50' onClick={onWhatsapp}> <MessageCircle /> Whatsapp</Button>
                    </div>
               </div>

               <div className='flex w-full gap-5 mt-6'>
                    <Link href={'/dashboard'}>
                         <Button > <ArrowLeft /> Back to Dashboard</Button>
                    </Link>
                    {/* <Link href = {'/dashboard/create-interview'}>
                         <Button> <Plus /> Create new Interview</Button>
                    </Link> */}
               </div>
          </div>
     )
}

export default InterviewLink