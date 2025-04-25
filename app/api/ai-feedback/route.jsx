import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
     // const conversation = await req.json();
     const { conversation, questionList, jobPosition, jobDescription } = await req.json();
     // const formattedQuestions = questionList?.map((item, index) => `${index + 1}. ${item.question}`).join('\n');
     console.log('QuestionList is ', questionList);

     const FINAL_PROMPT = FEEDBACK_PROMPT
          .replace('{{conversation}}', JSON.stringify(conversation))
          .replace('{{questionList}}', questionList)
          .replace('{{jobDescription}}', jobDescription)
          .replace('{{jobPosition}}', jobPosition)


     try {
          const openai = new OpenAI({
               baseURL: "https://openrouter.ai/api/v1",
               apiKey: process.env.OPENROUTER_API_KEY,
          })

          const completion = await openai.chat.completions.create({
               model: "agentica-org/deepcoder-14b-preview:free",     // Keep changing the model, because of api crash
               messages: [
                    { role: "user", content: FINAL_PROMPT }
               ],
          })
          // console.log("AI response", completion.choices[0].message)
          return NextResponse.json(completion.choices[0].message)
     }
     catch (e) {
          console.log(e);
          return NextResponse.json(e);
     }
}



// mistralai/mixtral-8x7b-instruct:free
// agentica-org/deepcoder-14b-preview:free
// meta-llama/llama-3-8b-instruct:free