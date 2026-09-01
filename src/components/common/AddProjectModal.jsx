// src/components/AddProjectModal.js
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const AddProjectModal = ({
  show,
  projectName,
  setProjectName,
  category,
  setCategory,
  existingCategories = [],
  onDeleteCategory,
  selectedYear,
  setSelectedYear,
  onAdd,
  onCancel
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryFieldRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryFieldRef.current && !categoryFieldRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  // Generate year options (past 10 years to next 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear - 10; year <= currentYear + 5; year++) {
    yearOptions.push(year);
  }

  const filteredCategories = existingCategories
    .filter(cat => cat.toLowerCase().includes(category.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    setShowCategoryDropdown(false);
  };

  const handleDeleteCategory = (e, cat) => {
    e.stopPropagation();
    if (category === cat) {
      setCategory('');
    }
    onDeleteCategory?.(cat);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              autoFocus
              required
            />
          </div>

          <div className="mb-4 relative" ref={categoryFieldRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setShowCategoryDropdown(true);
              }}
              onFocus={() => setShowCategoryDropdown(true)}
              placeholder="Enter or select a category"
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
            {showCategoryDropdown && existingCategories.length > 0 && (
              <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleSelectCategory(cat)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-teal-50"
                    >
                      {cat}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-400">
                    No matching category — it will be added as new
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Starting Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>
                  {year} {year === currentYear ? '(Current Year)' : year < currentYear ? '(Past Year)' : '(Future Year)'}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
