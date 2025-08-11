/**
 * @copyright Nomaan Faruki - 2025
 */

import React, { useState, useRef, useEffect } from 'react';
import FormHeader from './components/FormHeader.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import CategorizeBuilder from './components/builder/CategorizeBuilder.jsx';
import ClozeBuilder from './components/builder/ClozeBuilder.jsx';
import ComprehensionBuilder from './components/builder/ComprehensionBuilder.jsx';
import CategorizePreview from './components/preview/CategorizePreview.jsx';
import ClozePreview from './components/preview/ClozePreview.jsx';
import ComprehensionPreview from './components/preview/ComprehensionPreview.jsx';
import Footer from './components/Footer.jsx';

const FormBuilder = () => {
  const [form, setForm] = useState({
    title: 'QUIZ',
    headerImage: null,
    questions: []
  });

  const [currentView, setCurrentView] = useState('builder');
  const [responses, setResponses] = useState({});
  const [formId, setFormId] = useState(null);

  const fileInputRef = useRef(null);
  const backendUrl = 'http://localhost:5001/api';

  const QUESTION_TYPES = {
    CATEGORIZE: 'categorize',
    CLOZE: 'cloze',
    COMPREHENSION: 'comprehension'
  };

  const saveForm = async () => {
    try {
      const response = await fetch(`${backendUrl}/forms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          headerImage: form.headerImage,
          questions: form.questions.map(q => ({
            type: q.type,
            questionText: q.title,
            data: q
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to save the form');

      const data = await response.json();
      setFormId(data.formId);
      alert(`Form saved successfully! Form ID: ${data.formId}`);

    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form. Check the console for details.');
    }
  };

  const submitFormResponse = async () => {
    if (!formId) {
      alert('Please save the form first.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/forms/${formId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: formId,
          answers: Object.entries(responses).map(([questionId, answer]) => ({
            questionId,
            answer
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to submit responses');

      alert('Responses submitted successfully!');
      console.log('Responses submitted:', responses);

    } catch (error) {
      console.error('Error submitting responses:', error);
      alert('Failed to submit responses. Check the console for details.');
    }
  };

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      type,
      title: `Question ${form.questions.length + 1}`,
      ...getDefaultQuestionData(type)
    };
    setForm(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
  };

  const getDefaultQuestionData = (type) => {
    switch (type) {
      case QUESTION_TYPES.CATEGORIZE:
        return {
          description: '',
          categories: ['cat1', 'cat2'],
          items: ['ans1', 'ans2'],
          correctAnswers: { 'ans1': 'cat1', 'ans2': 'cat2' }
        };
      case QUESTION_TYPES.CLOZE:
        return { sentence: 'A quick _____ fox jumped over a _____', blanks: ['brown', 'fence'] };
      case QUESTION_TYPES.COMPREHENSION:
        return {
          passage: 'Type passage here...',
          questions: [{
            id: '1',
            question: 'Question text',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correct: 0
          }]
        };
      default:
        return {};
    }
  };

  const updateQuestion = (questionId, updates) => {
    setForm(prev => {
      const updatedQuestions = prev.questions.map(q => q.id === questionId ? { ...q, ...updates } : q);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const deleteQuestion = (questionId) => {
    setForm(prev => ({ ...prev, questions: prev.questions.filter(q => q.id !== questionId) }));
  };

  const handleHeaderImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setForm(prev => ({ ...prev, headerImage: e.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const renderQuestionBuilder = (question) => {
    switch (question.type) {
      case QUESTION_TYPES.CATEGORIZE:
        return <CategorizeBuilder question={question} updateQuestion={updateQuestion} />;
      case QUESTION_TYPES.CLOZE:
        return <ClozeBuilder question={question} updateQuestion={updateQuestion} />;
      case QUESTION_TYPES.COMPREHENSION:
        return <ComprehensionBuilder question={question} updateQuestion={updateQuestion} />;
      default:
        return <div>Unknown question type</div>;
    }
  };

  const renderQuestionPreview = (question) => {
    switch (question.type) {
      case QUESTION_TYPES.CATEGORIZE:
        return <CategorizePreview question={question} setResponses={setResponses} />;
      case QUESTION_TYPES.CLOZE:
        return <ClozePreview question={question} setResponses={setResponses} />;
      case QUESTION_TYPES.COMPREHENSION:
        return <ComprehensionPreview question={question} setResponses={setResponses} />;
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">?</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Questify</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView(currentView === 'builder' ? 'preview' : 'builder')}
                className="btn-secondary"
              >
                👁 {currentView === 'builder' ? 'Preview' : 'Edit'}
              </button>
              <button onClick={saveForm} className="btn-primary">
                💾 Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {currentView === 'builder' ? (
          <div className="grid grid-cols-4 gap-6">
            <div className="card p-4 h-fit">
              <h3 className="font-medium mb-4 text-gray-800">Question Types</h3>
              <div className="space-y-2">
                <button
                  onClick={() => addQuestion(QUESTION_TYPES.CATEGORIZE)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors flex items-center gap-2"
                >
                  📂 Categorize
                </button>
                <button
                  onClick={() => addQuestion(QUESTION_TYPES.CLOZE)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors flex items-center gap-2"
                >
                  ✏️ Cloze (Fill in blanks)
                </button>
                <button
                  onClick={() => addQuestion(QUESTION_TYPES.COMPREHENSION)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors flex items-center gap-2"
                >
                  📖 Comprehension
                </button>
              </div>
            </div>

            <div className="col-span-3">
              <div className="card">
                <FormHeader
                  form={form}
                  setForm={setForm}
                  fileInputRef={fileInputRef}
                  handleHeaderImageUpload={handleHeaderImageUpload}
                />

                <div className="p-6">
                  {form.questions.map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      updateQuestion={updateQuestion}
                      deleteQuestion={deleteQuestion}
                    >
                      {renderQuestionBuilder(question)}
                    </QuestionCard>
                  ))}

                  {form.questions.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p>No questions added yet.</p>
                      <p>Use the sidebar to add your first question.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="card">
              {form.headerImage && (
                <img
                  src={form.headerImage}
                  alt="Header"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}

              <div className="p-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{form.title}</h1>

                {form.questions.map((question, index) => (
                  <div key={question.id} className="mb-12 text-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                      {index + 1}. {question.title}
                    </h2>
                    {renderQuestionPreview(question)}
                  </div>
                ))}

                {form.questions.length > 0 && (
                  <div className="text-center pt-8">
                    <button
                      onClick={submitFormResponse}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FormBuilder;
