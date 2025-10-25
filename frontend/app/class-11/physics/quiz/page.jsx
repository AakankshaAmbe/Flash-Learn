"use client";

import React, { useState, useEffect } from "react";

export default function QuizPage() {
  const questions = [
    {
      question: "Who is known as the Father of Modern Physics?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "James Clerk Maxwell"],
      correctAnswer: "Albert Einstein",
    },
    {
      question: "Which branch of physics deals with the study of motion?",
      options: ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism"],
      correctAnswer: "Mechanics",
    },
    {
      question: "The SI unit of force is:",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      correctAnswer: "Newton",
    },
    {
      question: "Which of the following is a scalar quantity?",
      options: ["Velocity", "Force", "Acceleration", "Energy"],
      correctAnswer: "Energy",
    },
    {
      question: "Which of the following is NOT a fundamental force?",
      options: ["Gravitational", "Electromagnetic", "Nuclear", "Frictional"],
      correctAnswer: "Frictional",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const handleOptionChange = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    let scoreCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) scoreCount++;
    });
    setScore(scoreCount);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <h1 className="text-5xl font-bold text-green-400 mb-4">Quiz Submitted!</h1>
        <p className="text-2xl text-white mb-4">Your Score: {score} / {questions.length}</p>
        <a
          href="/class-11/physics/unit-1-physical-world"
          className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Back to Unit 1
        </a>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-10 text-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Physics — Unit 1 Quiz</h1>
          <div className="text-xl font-semibold text-red-600">⏱ {timeLeft}s</div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-semibold mb-5">
          Q{currentQuestion + 1}. {q.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {q.options.map((option, idx) => (
            <label
              key={idx}
              className={`block p-4 border rounded-xl cursor-pointer transition ${
                answers[currentQuestion] === option
                  ? "bg-purple-100 border-purple-400"
                  : "hover:bg-gray-100 border-gray-300"
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}  // ✅ Fixed syntax
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleOptionChange(option)}
                className="mr-3"
              />
              {option}
            </label>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
