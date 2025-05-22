"use client";
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Vapi from "@vapi-ai/web";
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';



function StartInterview() {

     const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
     const [activeUser, setActiveUser] = useState(false);
     const [conversation, setConversation] = useState();
     const { interview_id } = useParams();
     const router = useRouter();
     const [loading, setLoading] = useState(false);
     const [callEnd, setCallEnd] = useState(false);
     const [available, setAvailable] = useState(false);

     const questionList = interviewInfo?.interviewData?.questionList?.map(item => item.question).join('\n')
     // console.log(questionList);


     useEffect(() => {
          if (interviewInfo && !available) {
               startCall();
               console.log("Interview has been started")
          }
     }, [available]);


     // const startCall = () => {
     //      // let questionList;
     //      // interviewInfo?.interviewData?.questionList.forEach((item, index) => (
     //      //      questionList = item?.question + ',' + questionList
     //      // ))
     //      // console.log(questionList);

     //      const assistantOptions = {
     //           name: "AI Recruiter",
     //           firstMessage: "Hi " + interviewInfo?.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPosition,
     //           transcriber: {
     //                provider: "deepgram",
     //                model: "nova-2",
     //                language: "en-US",
     //           },
     //           voice: {
     //                provider: "playht",
     //                voiceId: "jennifer",
     //           },
     //           model: {
     //                provider: "openai",
     //                model: "gpt-4",
     //                messages: [
     //                     {
     //                          role: "system",
     //                          content: `
     //         You are an AI voice assistant conducting interviews.
     //         Your job is to ask candidates provided interview questions, assess their responses.
     //         Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
     //         "Hey there! Welcome to your ` + interviewInfo?.interviewData?.jobPosition + ` interview. Let’s get started with a few questions!"
     //         Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
     //         Questions: ` + questionList + `
     //         If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
     //         "Need a hint? Think about how React tracks component updates!"
     //         Provide brief, encouraging feedback after each answer. Example:
     //         "Nice! That’s a solid answer."
     //         "Hmm, not quite? Want to try again?" in a professional way
     //         Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
     //         After the completion of all the questions, wrap up the interview by summarizing their performance. Example:
     //         "That was great! You handled some tough questions with well. Keep sharpening your skills!" in professional way and If they struggled, offer kind and constructive improvement tips.
     //         End on a positive note like:
     //         "That wraps it up—awesome work! Keep growing and stay curious!"
     //         Key Guidelines:
     //         ✅ Be friendly, engaging, and witty ✅
     //         ✅ Keep responses short and natural, like a real conversation ✅
     //         ✅ Adapt based on the candidate’s confidence level ✅
     //         ✅ Ensure the interview remains focused on ` + interviewInfo?.interviewData?.jobPosition + ` ✅
     //                 `.trim(),
     //                     },
     //                ],
     //           },
     //      };

     //      vapi.start(assistantOptions)

     // }

     const startCall = async () => {
          const assistantOptions = {
               name: "AI Recruiter",
               firstMessage: "Hi " + interviewInfo?.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPosition,
               transcriber: {
                    provider: "deepgram",
                    model: "nova-2",
                    language: "en-US",
               },
               voice: {
                    provider: "playht",
                    voiceId: "jennifer",
               },
               model: {
                    provider: "openai",
                    model: "gpt-4",
                    messages: [
                         {
                              role: "system",
                              content: `
   You are an AI voice assistant conducting interviews.
   Your job is to ask candidates provided interview questions, assess their responses.
   Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
   "Hey there! Welcome to your ` + interviewInfo?.interviewData?.jobPosition + ` interview. Let’s get started with a few questions!" like that ask it in different way
   Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
   Questions: ` + questionList + `
   If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
   "Need a hint? Think about how React tracks component updates!"
   Provide short, brief, encouraging feedback after each answer in short. Example:
   "Nice! That’s a solid answer."
   "Hmm, not quite? Want to try again?" like that in a different way
   Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
   After the completion of all the questions, wrap up the interview by summarizing their performance. Example:
   "That was great! You handled some tough questions with well. Keep sharpening your skills!" like that in a  professional way and If they struggled, offer kind and constructive improvement tips.
   End on a positive note like:
   "That wraps it up—awesome work! Keep growing and stay curious!" like that in a professional way
   Key Guidelines:
   ✅ Be friendly, engaging, and witty ✅
   ✅ Keep responses short and natural, like a real conversation ✅
   ✅ Adapt based on the candidate’s confidence level ✅
   ✅ Ensure the interview remains focused on ` + interviewInfo?.interviewData?.jobPosition + ` ✅
           `.trim(),
                         },
                    ],
               },
          };

          try {
               await vapi.start(assistantOptions);
          } catch (error) {
               console.error("Error starting interview:", error);
               toast.error("Failed to start interview. Please try again.");
               // Optional: Show fallback UI or set an error state
          }

     }


     // const stopInterview = () => {
     //      console.log("Interview has been stopped");
     //      vapi.stop();
     //      console.log("Interview has been stopped  d");
     //      setAvailable(true)
     //      setCallEnd(true);
     //      GenerateFeedback();
     // }


     useEffect(() => {
          const handleMessage = (message) => {
               // console.log('Message: ', message);
               if (message?.conversation) {
                    const convoString = JSON.stringify(message?.conversation);
                    // console.log('Conversation: ', convoString);
                    setConversation(convoString);
               }
          };

          vapi.on("message", handleMessage);

          vapi.on("call-start", () => {
               console.log("Call has started.");
               // toast('Interview started');
          });

          vapi.on("speech-start", () => {
               console.log("Assistant speech has started.");
               setActiveUser(false);
          });

          vapi.on("speech-end", () => {
               console.log("Assistant speech has ended.");
               setActiveUser(true);
          });

          vapi.on("call-end", () => {
               console.log("Call has ended.");
               // toast('Interview ended');
               // GenerateFeedback();
          });

          return () => {
               vapi.off("message", handleMessage);
               vapi.off("call-start", () => console.log("END"));
               vapi.off("speech-start", () => console.log("END"));
               vapi.off("speech-end", () => console.log("END"));
               vapi.off("call-end", () => console.log("END"));
          };

     }, []);


     const stopInterview = async () => {
          try {
               await vapi.stop();
          } catch (error) {
               console.error("Error stopping interview:", error);
               // Prevent crashing the app
          }
          console.log("Interview has been stopped");
          setAvailable(true)
          GenerateFeedback();
     }

     const jobPosition = interviewInfo?.interviewData?.jobPosition
     const jobDescription = interviewInfo?.interviewData?.jobDescription

     const GenerateFeedback = async () => {
          setLoading(true);
          try {
               const result = await axios.post('/api/ai-feedback', {
                    conversation: conversation,
                    questionList,
                    jobPosition,
                    jobDescription
               })

               // console.log('Result is', result?.data);
               const Content = result.data.content;
               const FINAL_CONTENT = Content.replace('```json', '').replace('```', '');
               console.log(FINAL_CONTENT);


               // Save it to Database
               const { data, error } = await supabase
                    .from('interview-feedback')
                    .insert([
                         {
                              userName: interviewInfo?.userName,
                              userEmail: interviewInfo?.userEmail,
                              interview_id: interview_id,
                              feedback: JSON.parse(FINAL_CONTENT),
                              recommended: false
                         },
                    ])
                    .select()

               console.log(data);
               router.replace('/interview/' + interview_id + '/completed');
               setLoading(false);
          }
          catch (e) {
               console.log('Error QL', e);
               toast('Server Error, Try Again!')
               setLoading(false);
               // setCallEnd(true);   // remember to comment this after
          }
     }



     return (
          <div className='px-5 sm:px-12 lg:px-48 xl:px-56 min-h-screen'>
               <h2 className='font-bold text-xl flex justify-between mt-2 sm:mt-4 text-white'>
                    AI Interview Session
                    <span className='flex gap-2 items-center text-blue-600'>
                         <Timer />
                         {/* 00:00:00 */}
                         {/* <TimerComponenet start = {true} /> */}
                    </span>
               </h2>

               <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 mt-5'>
                    <div className='bg-gray-400 h-[200px] sm:h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                         <div className='relative'>
                              {
                                   !activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />
                              }
                              <Image src={'/ai.jpg'} alt="ai" width={100} height={100}
                                   className='w-[60px] h-[60px] rounded-full obj-cover'
                              />
                         </div>
                         <h2 className='font-medium text-white'>AI Recruiter</h2>
                    </div>
                    <div className='bg-[#979b9a] h-[200px] sm:h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                         <div className='relative'>
                              {
                                   activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />
                              }
                              <h2 className='text-2xl capitalize bg-primary text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
                         </div>
                         <h2 className='font-medium text-white capitalize'>{interviewInfo?.userName}</h2>
                    </div>
               </div>

               <div className='flex items-center gap-5 justify-center mt-7'>
                    {/* <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' /> */}
                    {/* <AlertConfirmation stopInterview={() => stopInterview()}> */}
                    {
                         !loading ?
                              <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer'
                                   onClick={() => stopInterview()}
                              />
                              :
                              <Loader2Icon className='animate-spin text-white' />
                    }
                    {/* </AlertConfirmation> */}
               </div>

               <h2 className='text-sm text-gray-400 text-center mt-3'>Interview in Progress...</h2>
          </div>
     )
}

export default StartInterview