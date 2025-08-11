/**
 * @copyright Nomaan Faruki - 2025
 */
import React from 'react';
import { TrashIcon, Bars3Icon } from '@heroicons/react/24/outline';

const QuestionCard = ({ question, updateQuestion, deleteQuestion, children }) => {
  return (
    <div className="mb-8 card-border">
      <div className="flex items-center justify-between mb-4 text-gray-400">
        <div className="flex items-center gap-2">
          <Bars3Icon className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={question.title}
            onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
            className="text-lg font-medium bg-transparent border-none outline-none text-gray-800 placeholder-text"
            placeholder="Question title"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
            {question.type}
          </span>
          <button
            onClick={() => deleteQuestion(question.id)}
            className="btn-icon-danger"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default QuestionCard;
