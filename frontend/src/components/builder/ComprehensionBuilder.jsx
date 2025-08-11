/**
 * @copyright Nomaan Faruki - 2025
 */
import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const ComprehensionBuilder = ({ question, updateQuestion }) => {
  const addMCQQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: 'New question',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correct: 0
    };
    
    updateQuestion(question.id, {
      questions: [...question.questions, newQuestion]
    });
  };

  const updateMCQQuestion = (mcqId, updates) => {
    const updatedQuestions = question.questions.map(q => 
      q.id === mcqId ? { ...q, ...updates } : q
    );
    updateQuestion(question.id, { questions: updatedQuestions });
  };

  const removeMCQQuestion = (mcqId) => {
    const updatedQuestions = question.questions.filter(q => q.id !== mcqId);
    updateQuestion(question.id, { questions: updatedQuestions });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Passage</label>
        <textarea
          className="input-field h-32 placeholder-text"
          value={question.passage}
          onChange={(e) => updateQuestion(question.id, { passage: e.target.value })}
          placeholder="Type passage here..."
        />
      </div>

      <div>
        <h4 className="font-medium mb-2">Questions</h4>
        {question.questions.map((mcq, index) => (
          <div key={mcq.id} className="card-border mb-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Question {index + 1}</h5>
              <button onClick={() => removeMCQQuestion(mcq.id)} className="btn-icon-danger">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Question text"
              className="input-field mb-2"
              value={mcq.question}
              onChange={(e) => updateMCQQuestion(mcq.id, { question: e.target.value })}
            />
            
            {mcq.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name={`correct-${mcq.id}`}
                  checked={mcq.correct === optIndex}
                  onChange={() => updateMCQQuestion(mcq.id, { correct: optIndex })}
                  className="text-blue-500"
                />
                <input
                  type="text"
                  className="input-field-sm"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...mcq.options];
                    newOptions[optIndex] = e.target.value;
                    updateMCQQuestion(mcq.id, { options: newOptions });
                  }}
                />
              </div>
            ))}
          </div>
        ))}
        
        <button onClick={addMCQQuestion} className="text-blue-500 text-sm hover:text-blue-700">
          + Add MCQ Question
        </button>
      </div>
    </div>
  );
};

export default ComprehensionBuilder;
