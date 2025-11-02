// This is our Edit Modal Component 
//After a successful update, the application's cached list of products must automatically reflect the change without requiring a manual full list re-fetch
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateProductMutation } from '../services/api';
import { productsApi } from '../services/api'; 

export default function EditProductModal({ product, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [updateProduct, { isLoading }] = useUpdateProductMutation(); // here updateProduct is a function to trigger the mutation

  useEffect(() => { //Pre-fill Form When Modal Opens
    if (isOpen && product) {
      setEditTitle(product.title || '');
      setEditPrice(String(product.price || ''));
    }
  }, [isOpen, product]);

  const handleSave = async () => {
    try {

      // This will update cache hand to hand
    //   Updates the detail view (if user stays on this page)
      dispatch(
        productsApi.util.updateQueryData('getProductById', product.id, (draft) => {
          draft.title = editTitle;
          draft.price = parseFloat(editPrice);
        })
      );

    //   Updates the product list (so grid shows new title/price instantly)
      dispatch(
        productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
          const item = draft.find(p => p.id === product.id);
          if (item) {
            item.title = editTitle;
            item.price = parseFloat(editPrice);
          }
        })
      );

      // 2. Send actual request
      await updateProduct({
        id: product.id,
        title: editTitle,
        price: parseFloat(editPrice),
        description: product.description,
        category: product.category,
      }).unwrap(); //throws error if request fails → caught by catch

      onClose();
    } catch (err) {
      // On error, RTK Query automatically reverts cache if you use `onQueryStarted`
      // But since we did manual update, we should revert manually or rely on refetch
      alert('Update failed. Changes may revert on refresh.');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside modal
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Product</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}