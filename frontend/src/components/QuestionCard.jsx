/**
 * @copyright Nomaan Faruki - 2025
 */
import React from 'react';

const TrashIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const Bars3Icon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className={className}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

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
