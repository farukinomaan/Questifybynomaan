/**
 * @copyright Nomaan Faruki - 2025
 */

import React, { useState } from 'react';

const CategorizePreview = ({ question, setResponses }) => {
  const [draggedOverCategory, setDraggedOverCategory] = useState(null);
  const [itemPlacements, setItemPlacements] = useState({});

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    const newPlacements = { ...itemPlacements, [item]: category };
    setItemPlacements(newPlacements);
    setDraggedOverCategory(null);
    setResponses(prev => ({ ...prev, [question.id]: newPlacements }));
  };

  const unplacedItems = question.items.filter(item => !itemPlacements[item]);

  return (
    <div className="space-y-4 text-gray-800">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {question.categories.map(category => (
          <div
            key={category}
            className={`border-2 border-dashed p-4 min-h-[100px] rounded ${
              draggedOverCategory === category ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
            onDragEnter={() => setDraggedOverCategory(category)}
            onDragLeave={() => setDraggedOverCategory(null)}
          >
            <h4 className="font-medium mb-2 text-center">{category}</h4>
            {Object.entries(itemPlacements)
              .filter(([item, cat]) => cat === category)
              .map(([item]) => (
                <div
                  key={item}
                  className="bg-blue-100 p-2 rounded text-center mb-2 cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  {item}
                </div>
              ))}
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {unplacedItems.map(item => (
          <div
            key={item}
            className="bg-gray-200 p-2 rounded cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorizePreview;