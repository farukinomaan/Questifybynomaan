/**
 * @copyright Nomaan Faruki - 2025
 */
import React from 'react';

const XMarkIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
    className={className}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const CategorizeBuilder = ({ question, updateQuestion }) => {
  const addCategory = () => {
    const newCat = `Category ${question.categories.length + 1}`;
    updateQuestion(question.id, {
      categories: [...question.categories, newCat]
    });
  };

  const addItem = () => {
    const newItem = `Item ${question.items.length + 1}`;
    updateQuestion(question.id, {
      items: [...question.items, newItem]
    });
  };

  const updateCategory = (index, value) => {
    const newCategories = [...question.categories];
    newCategories[index] = value;
    updateQuestion(question.id, { categories: newCategories });
  };

  const updateItem = (index, value) => {
    const newItems = [...question.items];
    newItems[index] = value;
    updateQuestion(question.id, { items: newItems });
  };

  const removeCategory = (index) => {
    const newCategories = question.categories.filter((_, i) => i !== index);
    updateQuestion(question.id, { categories: newCategories });
  };

  const removeItem = (index) => {
    const newItems = question.items.filter((_, i) => i !== index);
    updateQuestion(question.id, { items: newItems });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Description (Optional)"
        className="input-field placeholder-text"
        value={question.description || ''}
        onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
      />
      
      <div>
        <h4 className="font-medium mb-2">Categories</h4>
        {question.categories.map((cat, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={cat}
              onChange={(e) => updateCategory(index, e.target.value)}
              className="input-field"
            />
            <button onClick={() => removeCategory(index)} className="btn-icon-danger">
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button onClick={addCategory} className="text-blue-500 text-sm hover:text-blue-700">
          + Add Category
        </button>
      </div>

      <div>
        <h4 className="font-medium mb-2">Items</h4>
        {question.items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="input-field"
            />
            <select
              className="p-2 border rounded bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={question.correctAnswers[item] || ''}
              onChange={(e) => updateQuestion(question.id, {
                correctAnswers: { ...question.correctAnswers, [item]: e.target.value }
              })}
            >
              <option value="">Select Category</option>
              {question.categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={() => removeItem(index)} className="btn-icon-danger">
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button onClick={addItem} className="text-blue-500 text-sm hover:text-blue-700">
          + Add Item
        </button>
      </div>
    </div>
  );
};

export default CategorizeBuilder;
