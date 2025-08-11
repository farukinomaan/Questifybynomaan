/**
 * @copyright Nomaan Faruki - 2025
 */


import React, { useState } from 'react';

const ClozePreview = ({ question, setResponses }) => {
  const [answers, setAnswers] = useState({});
  
  const renderSentenceWithBlanks = () => {
    let sentence = question.sentence;
    const blanks = question.blanks || [];
    
    blanks.forEach((blank, index) => {
      const blankId = `blank-${index}`;
      const input = `<input type="text" class="inline-input" data-blank-id="${blankId}" placeholder="____" />`;
      sentence = sentence.replace('_____', input);
    });
    
    return sentence;
  };

  return (
    <div className="space-y-4 text-gray-800">
      <div 
        className="text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderSentenceWithBlanks() }}
      />
      
      {question.blanks && question.blanks.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Available Options:</h4>
          <div className="flex flex-wrap gap-2">
            {question.blanks.map((option, index) => (
              <span key={index} className="bg-blue-100 px-3 py-1 rounded text-sm cursor-pointer">
                {option}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .inline-input {
          display: inline-block;
          width: 100px;
          padding: 2px 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin: 0 2px;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default ClozePreview;