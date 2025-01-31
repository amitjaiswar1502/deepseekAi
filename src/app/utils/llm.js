import { pipeline } from '@xenova/transformers';

let model;
try {
  console.log('Loading Qwen2.5-Coder:14B...');
  model = await pipeline('text-generation', 'Qwen/Qwen2.5-Coder-14B'); // Replace with the correct model path
  console.log('Model loaded successfully');
} catch (error) {
  console.error('Failed to load Qwen2.5-Coder:14B:', error.message);
  throw new Error('Model initialization failed');
}

export async function generateReferenceAnswer(question) {
  try {
    const prompt = `Question: ${question}\nProvide a detailed and accurate answer.`;
    const result = await model(prompt, { max_length: 100 });
    return result[0].generated_text;
  } catch (error) {
    console.error('Error generating reference answer:', error.message);
    throw new Error('Failed to generate reference answer');
  }
}

export async function verifyAnswer(question, userAnswer, referenceAnswer) {
  try {
    const prompt = `Question: ${question}\nReference Answer: ${referenceAnswer}\nUser Answer: ${userAnswer}\nEvaluate the user's answer against the reference answer and provide a percentage score (0-100).`;
    const result = await model(prompt, { max_length: 50 });
    return result[0].generated_text;
  } catch (error) {
    console.error('Error verifying answer:', error.message);
    throw new Error('Failed to evaluate user answer');
  }
}