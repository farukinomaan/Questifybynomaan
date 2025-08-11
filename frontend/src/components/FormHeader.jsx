/**
 * @copyright Nomaan Faruki - 2025
 */
import React from 'react';

const ArrowUpTrayIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 7.5l4.5-4.5m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
);

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
          <ArrowUpTrayIcon className="w-4 h-4" />
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
