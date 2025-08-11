/**
 * @copyright Nomaan Faruki - 2025
 */

import React, { useState } from 'react';

const ComprehensionPreview = ({ question, setResponses }) => {
  const [answers, setAnswers] = useState({});

  return (
    <div className="space-y-6 text-gray-800">
      <div className="bg-gray-50 p-4 rounded border-gray-300">
        <h4 className="font-medium mb-2">Passage</h4>
        <p className="text-sm leading-relaxed">{question.passage}</p>
      </div>
      
      {question.questions.map((mcq, index) => (
        <div key={mcq.id} className="space-y-2">
          <h5 className="font-medium">Question {index + 1}: {mcq.question}</h5>
          {mcq.options.map((option, optIndex) => (
            <label key={optIndex} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`mcq-${mcq.id}`}
                value={optIndex}
                onChange={(e) => setAnswers(prev => ({ ...prev, [mcq.id]: parseInt(e.target.value) }))}
                className="text-blue-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ComprehensionPreview;