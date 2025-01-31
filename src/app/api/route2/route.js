import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(request) {
  try {
    const { question, user_answer } = await request.json();

    const systemPrompt = `
      you are experianced coding assinstant.
      your final output should be the evaluation of data after executing code
      Tell user that answer is correct or not.
      Provide final output should be in json format without any extra text:
      Example: 
      {
        question: "",
        user_answer: "",
        evaluation_result: "",
        correct_answer: ""
      }
    `;
    const response = await ollama.chat({
      model: "qwen2.5-coder:14b",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `
            Question: ${question}
            Answer: ${user_answer}
          `,
        },
      ],
      //stream: true
    });
    
    // console.log();

    // if (res.status == 200) {
       return NextResponse.json(JSON.parse(response.message.content.replace("```json","").replace("```","")), { status: 200 });
    //   } else if (res.status >= 400) {
    //     deleteCookieData();
    //     return NextResponse.json(body, { status: res.status });
    //   } else {
    //     return NextResponse.json(body, { status: 400 });
    //   }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
