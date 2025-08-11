/**
 * @copyright Nomaan Faruki - 2025
 */

import React from 'react';
import { Upload } from 'lucide-react';

const FormHeader = ({ form, setForm, fileInputRef, handleHeaderImageUpload }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
          className="text-2xl font-bold bg-transparent border-none outline-none text-gray-800 placeholder-text"
          placeholder="Untitled Quiz"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Upload size={16} />
          Header Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleHeaderImageUpload}
          className="hidden"
        />
      </div>
      
      {form.headerImage && (
        <img
          src={form.headerImage}
          alt="Header"
          className="w-full h-32 object-cover rounded"
        />
      )}
    </div>
  );
};

export default FormHeader;