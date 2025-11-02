// This is our Delete Confirmation Modal Component 
import { useDeleteProductMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';


// Getting productId, isOpen, onClose as props
export default function DeleteConfirmationModal({ productId, isOpen, onClose }) {
  const navigate = useNavigate();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(productId).unwrap(); // here unwrap will throw error if request fails
      // This will also do hand to hand delete  
      navigate('/products'); // Go back to product list
    } catch (err) {
      alert('Failed to delete product.');
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}