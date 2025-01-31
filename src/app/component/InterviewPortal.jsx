"use client";
import { useState } from "react";
import { startSpeechRecognition, speakText } from "../utils/speech";
import { questions, randomQuestion } from "../utils/questions";

export default function InterviewPortal() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState("");
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);


  const currentQuestion = randomQuestion;
  const [isListening, setIsListening] = useState(false);

  // console.log(currentQuestionIndex);

  const handleSpeechInput = () => {
    startSpeechRecognition((transcript) => {
      setUserAnswer(transcript);
      if (transcript.length > 0) {
        setIsListening(true);
      } else {
        setIsListening(false);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/route2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: currentQuestion,
        user_answer: userAnswer || transcript,
      }),
    });

    const data = await response.json();
    setEvaluation(data);

    // Reset fields for the next question
    setUserAnswer("");


    // Move to the next question if available
    // if (currentQuestion < questions.length - 1) {
    //   setCurrentQuestionIndex(currentQuestionIndex + 1);
    // } else {
    //   alert("You have completed all the questions!");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* <div className="bg-gray-500 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">AI Interview Portal</h1>
        <p className="text-lg font-medium">{question}</p>
        <div className="space-y-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-3 text-black border border-gray-300 rounded"
          />
          <button
            onClick={handleSpeechInput}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Speak Your Answer
          </button>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Submit Answer
          </button>
        </div>
        {referenceAnswer && (
          <div className="bg-yellow-100 p-4 rounded">
            <h2 className="text-lg font-bold">Reference Answer:</h2>
            <p>{referenceAnswer}</p>
          </div>
        )}
        {evaluation && (
          <div className="bg-yellow-100 p-4 rounded">
            <h2 className="text-lg font-bold">Evaluation:</h2>
            <p>{evaluation}</p>
          </div>
        )}
      </div> */}

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Evaluate Your Answer
          </h2>

          {/* Current Question */}

          <h3 className="text-lg leading-6 text-center font-medium text-gray-900">
            {currentQuestion}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Question Input */}

            {/* User Answer Input */}
            <div>
              <label htmlFor="userAnswer" className="sr-only">
                Your Answer
              </label>
              <input
                id="userAnswer"
                name="userAnswer"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your answer here..."
              />
            </div>

            {/* Speech-to-Text Button */}
            <div>
              <button
                type="button"
                onClick={handleSpeechInput}
                className={`group mt-4 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isListening ? "Stop Listening" : "Start Listening"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Submit
            </button>
          </div>
        </form>

        {/* Evaluation Result */}
        {evaluation && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Evaluation Result
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Here is the feedback on your answer.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Question
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {evaluation.question}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Your Answer
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {evaluation.user_answer}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Evaluation Result
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        evaluation.evaluation_result === "Correct"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {evaluation.evaluation_result}
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Correct Answer
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {evaluation.correct_answer}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
