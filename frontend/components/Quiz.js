"use client";

import React, { useEffect, useState } from "react";

export default function Quiz({ classLevel, subject, topic }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`/api/questions?class_level=${classLevel}&subject=${subject}&topic=${topic}`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  }, [classLevel, subject, topic]);

  const handleOptionChange = (qId, oId) => setAnswers({ ...answers, [qId]: oId });

  const handleSubmit = () => {
    let count = 0;
    questions.forEach(q => {
      const correct = q.options.find(o => o.is_correct);
      if (answers[q.question_id] === correct.id) count++;
    });
    setScore(count);
    setSubmitted(true);
  };

  if (!questions.length) return <p className="text-white text-center mt-10">Loading Quiz...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {questions.map((q, idx) => (
        <div key={q.question_id} className="mb-6 p-4 bg-gray-800 rounded-lg text-white">
          <h3 className="font-semibold">{idx + 1}. {q.question_text}</h3>
          <div className="mt-2 space-y-2">
            {q.options.map(o => (
              <label
                key={o.id}
                className={`block p-2 border rounded cursor-pointer transition ${
                  submitted
                    ? o.is_correct
                      ? "bg-green-600"
                      : answers[q.question_id] === o.id
                      ? "bg-red-600"
                      : ""
                    : "hover:bg-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${q.question_id}`}
                  value={o.id}
                  checked={answers[q.question_id] === o.id}
                  disabled={submitted}
                  onChange={() => handleOptionChange(q.question_id, o.id)}
                  className="mr-2"
                />
                {o.option_text}
              </label>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 rounded mt-4 hover:bg-green-600 transition"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="mt-4 text-white font-bold text-lg text-center">
          Score: {score} / {questions.length}
        </p>
      )}
    </div>
  );
}
