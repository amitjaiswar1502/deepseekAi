import React from 'react'

import { deepseek, createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

const Test = async () => {
  const deepseek = createDeepSeek({
    baseURL: "http://localhost:11434", 
    
  });

  const { text } = await generateText({
    model: deepseek('deepseek-chat',),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });


  return (
    <div>
      Hello Test
    </div>
  )
}

export default Test
