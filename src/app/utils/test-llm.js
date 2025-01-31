import { generateReferenceAnswer, verifyAnswer } from './utils/llm';

(async () => {
  try {
    const question = 'What is your greatest strength?';
    const userAnswer = 'I am a quick learner and adaptable.';

    // Generate reference answer
    const referenceAnswer = await generateReferenceAnswer(question);
    console.log('Reference Answer:', referenceAnswer);

    // Verify user's answer
    const evaluation = await verifyAnswer(question, userAnswer, referenceAnswer);
    console.log('Evaluation:', evaluation);
  } catch (error) {
    console.error('Test failed:', error.message);
  }
})();