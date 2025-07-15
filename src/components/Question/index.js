"use client";

import React from 'react';

const Questions = ({ questions, onAnswerChange }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Preguntas sobre el Producto</h1>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <details>
            <summary className="mb-2 cursor-pointer">{q.question}</summary>
            {q.options.map((option, i) => (
              <div key={i} className="mb-2 pl-4">
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={(e) => onAnswerChange(index, e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              </div>
            ))}
          </details>
        </div>
      ))}
    </div>
  );
};

export default Questions;
