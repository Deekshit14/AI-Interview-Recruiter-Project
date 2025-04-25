import { BriefcaseBusinessIcon, Calendar, Code2Icon, Component, LayoutDashboard, List, Puzzle, Settings, Shield, User2Icon, WalletCards } from "lucide-react";

export const SideBarOptions = [
     {
          name: 'Dashboard',
          icon: LayoutDashboard,
          path: '/dashboard'
     },
     {
          name: 'Scheduled Interview',
          icon: Calendar,
          path: '/scheduled-interview'
     },
     {
          name: 'All Interview',
          icon: List,
          path: '/all-interview'
     },
     // {
     //      name: 'Billing',
     //      icon: WalletCards,
     //      path: '/billing'
     // },
     // {
     //      name: 'Settings',
     //      icon: Settings,
     //      path: '/settings'
     // },
]



export const InterviewType = [
     {
          title: 'Technical',
          icon: Code2Icon
     },
     {
          title: 'Behavioral',
          icon: User2Icon
     },
     {
          title: 'Experience',
          icon: BriefcaseBusinessIcon
     },
     {
          title: 'Problem Solving',
          icon: Puzzle
     },
     {
          title: 'Leadership', 
          icon: Component
     },
]


export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}

Job Description:{{jobDescription}}

Interview Duration: {{duration}}

Interview Type: {{type}}

🧠 Your task:
Provide only questions, without any additional explanations or context.
Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life {{type}} interview.

🌟 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:'',
  type: 'Technical/Behavioral/Experience/Problem Solving/Leadership'
},{
...
}]
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`



// export const FEEDBACK_PROMPT = `{{conversation}}
// Depends on this Interview Conversation between assistant and user on {{jobPosition}} with quesions related to {{jobDescription}} 
// Give me feedback for user interview.
// Evaluate whether the user answered all the questions: {{questionList}}, if not provide a feedback on those questions which the user was not clear about.
// If user ends the call early without answering all the questions {{questionList}} then provide a negative feedback and not a good rating.
// Give me rating out of 10 for technical Skills, Communication, Problem Solving, Experince based on the above scenarios. 
// Also give me summary in 250 to 300 words about the interview and three lines to let me know whether I am recommanded for hire or not with msg. 
// Give me response in JSON format like below:
// {  
//   feedback:{  
//     rating:{  
//       techicalSkills: (rating out of 10),  
//       communication: (rating out of 10),  
//       problemSolving: (rating out of 10),  
//       experince: (rating out of 10)  
//     },  
//     summary:<in 250 to 300 words>,  
//     Recommendation: (yes/no),  
//     RecommendationMsg:""  
//   }  
// }  
// `



export const FEEDBACK_PROMPT = `converstion:- {{conversation}}
Based on the above interview conversation between the assistant and the user for the position of {{jobPosition}}, using questions related to {{jobDescription}}, provide a detailed evaluation of the user's performance.

Instructions:
- Cross-check the total number of questions in {{questionList}} with the number of questions actually asked and answered in the above conversation.
- If there is a significant mismatch or only a portion of the questions are addressed in the conversation compareded to the questionsList provided, assume the user ended the call early or the interview was incomplete and provide extremely low rating and feedback.
- DO NOT rate the user's performance based solely on the few questions attempted. Instead, rate their overall performance as incomplete and assign lower ratings accordingly in all skill areas. Especially if user ended call early rate them extremely low in all skills.
- Provide specific feedback for any questions that were skipped or unclearly answered.
- Ratings should reflect the performance expected in a complete and thorough interview process.

Rate the user out of 10 in the following areas:
  - Technical Skills
  - Communication
  - Problem Solving
  - Experience

Also provide:
- A summary of the interview process in 400 to 450 words, highlighting the user's strengths, weaknesses, and overall impression.
- Include improvement tips based on the incomplete or weak areas identified.

Conclude with a hiring recommendation:
  - Recommendation: "yes" or "no"
  - RecommendationMsg: A brief 50 to 70 words of message justifying the decision.
Give me response in JSON format like below:
{  
  feedback:{  
    rating:{  
      techicalSkills: (rating out of 10),  
      communication: (rating out of 10),  
      problemSolving: (rating out of 10),  
      experince: (rating out of 10)  
    },  
    summary:<in 300 to 350 words>,  
    Recommendation: (yes/no),  
    RecommendationMsg:""  
  }  
}  
`