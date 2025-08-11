/**
 * @copyright Nomaan Faruki - 2025
 */

import React from 'react';
import { Trash2, GripVertical } from 'lucide-react';

const QuestionCard = ({ question, updateQuestion, deleteQuestion, children }) => {
  return (
    <div className="mb-8 card-border">
      <div className="flex items-center justify-between mb-4 text-gray-400">
        <div className="flex items-center gap-2">
          <GripVertical className="text-gray-500" size={16} />
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
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default QuestionCard;