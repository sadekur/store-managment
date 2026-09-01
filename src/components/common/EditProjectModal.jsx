// src/components/EditProjectModal.js
import React from 'react';
import CategoryPicker from './CategoryPicker';

const EditProjectModal = ({
  show,
  projectName,
  setProjectName,
  category,
  setCategory,
  existingCategories = [],
  onDeleteCategory,
  onSave,
  onCancel
}) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
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

          <CategoryPicker
            value={category}
            onChange={setCategory}
            existingCategories={existingCategories}
            onDeleteCategory={onDeleteCategory}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Save Changes
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

export default EditProjectModal;
