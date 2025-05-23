import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
     const { jobPosition, jobDescription, duration, type } = await req.json();

     const FINAL_PROMPT = QUESTIONS_PROMPT
          .replace('{{jobTitle}}', jobPosition)
          .replace('{{jobDescription}}', jobDescription)
          .replace('{{duration}}', duration)
          .replace('{{type}}', type);

     // console.log('FINAL_PROMPT is', FINAL_PROMPT);
     try {
          const openai = new OpenAI({
               baseURL: "https://openrouter.ai/api/v1",
               apiKey: process.env.OPENROUTER_API_KEY,
          })

          const completion = await openai.chat.completions.create({
               model: "google/gemma-3-4b-it:free",      // Keep changing the model, because of api crash
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