// src/components/common/CategoryPicker.js
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const CategoryPicker = ({ value, onChange, existingCategories = [], onDeleteCategory }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const fieldRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fieldRef.current && !fieldRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategories = existingCategories
    .filter(cat => cat.toLowerCase().includes(value.trim().toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const handleSelect = (cat) => {
    onChange(cat);
    setShowDropdown(false);
  };

  const handleDelete = (e, cat) => {
    e.stopPropagation();
    if (value === cat) {
      onChange('');
    }
    onDeleteCategory?.(cat);
  };

  return (
    <div className="mb-4 relative" ref={fieldRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Enter or select a category"
        autoComplete="off"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        required
      />
      {showDropdown && existingCategories.length > 0 && (
        <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(cat => (
              <div
                key={cat}
                className="flex items-center justify-between hover:bg-teal-50"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(cat)}
                  className="flex-1 text-left px-3 py-2 text-sm text-gray-700"
                >
                  {cat}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, cat)}
                  className="px-2 py-2 text-gray-400 hover:text-red-600"
                  aria-label={`Delete category ${cat}`}
                  title={`Delete category "${cat}"`}
                >
                  <X size={14} />
                </button>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">
              No matching category — it will be added as new
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPicker;
