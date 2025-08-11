/**
 * @copyright Nomaan Faruki - 2025
 */

import React from 'react';

const ClozeBuilder = ({ question, updateQuestion }) => {
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const selectedText = selection.toString();
      const sentence = question.sentence;
      const newSentence = sentence.replace(selectedText, '_____');
      
      updateQuestion(question.id, {
        sentence: newSentence,
        blanks: [...(question.blanks || []), selectedText]
      });
      
      selection.removeAllRanges();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Sentence (Select text to create blanks)</label>
        <textarea
          className="input-field h-24 placeholder-text"
          value={question.sentence}
          onChange={(e) => updateQuestion(question.id, { sentence: e.target.value })}
          onMouseUp={handleTextSelection}
          placeholder="Type your sentence here and select words to convert to blanks..."
        />
      </div>
      
      {question.blanks && question.blanks.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Answer Options</h4>
          <div className="flex flex-wrap gap-2">
            {question.blanks.map((blank, index) => (
              <span key={index} className="bg-blue-100 px-3 py-1 rounded text-sm text-gray-800">
                {blank}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClozeBuilder;