export const questions = [
  "What does 'undefined' mean in JavaScript?",
  "How do you declare a variable in JavaScript?",
  "What is the difference between `let` and `const` in JavaScript?",
  "Write a function that adds two numbers and returns their sum.",
  "What is an event listener in JavaScript?",
  "Explain what `this` refers to in JavaScript.",
  "How do you handle errors in JavaScript using try-catch?",
  "What are the differences between arrays and objects in JavaScript?",
  "Write a loop that iterates from 0 to 10 and prints each number.",
  "How do you convert an array into a string?",
];

let data = Math.floor(Math.random() * questions.length - 1);
export const randomQuestion = questions[data];

//system promts
/* you are experianced coding assinstant.
your final output should be the evaluation of data after executing code.
Provide evaluation only without any explanation.
Tell user that answer is correct or not.
Provide final output in following json format:
{
question: "",
user_answer: "",
evaluation_result: "",
correct_answer: ""
} */
