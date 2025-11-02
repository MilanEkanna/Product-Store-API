// This is our Product details page component.
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../services/api';
import EditProductModal from '../components/EditProductModal';
import { useState } from 'react';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';


const renderStars = (rate) => {
    const fullStars = Math.floor(rate); // Math.floor(4.3) → 4, gives the number of complete (filled) stars.
    const hasHalf = rate % 1 >= 0.5; // Check if there's a half star, // 4.3 % 1 = 0.3 → 0.3 >= 0.5? → false
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        } else if (i === fullStars && hasHalf) {
            stars.push(<span key={i} className="text-yellow-400">★</span>); // Simplified half-star
        } else {
            stars.push(<span key={i} className="text-gray-300">☆</span>);
        }
    }
    return <span className="inline-flex">{stars}</span>;
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = Number(id);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control Edit Modal visibility
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control Delete Confirmation Modal visibility

    // Handle invalid product ID (non-numeric or negative) however the id is coming from an prebuilt api so we can neglect this code but for production use case we will consider it

    if (isNaN(productId) || productId <= 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Invalid product ID.</p>
                    <button
                        onClick={() => navigate(-1)} // -1 indicates Go back to previous page
                        className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                        ← Go back
                    </button>
                </div>
            </div>
        );
    }

    const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
    // Fetch product details using RTK Query hook
    if (isLoading) { // Show loading state here we can also use skeleton loader for better UX
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600 text-lg">Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Product not found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                        ← Go back to products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-medium transition"
                    aria-label="Go back to products"
                >
                    ← Back to Products
                </button>
            </div>

            {/* Product Detail Card */}
            <div className="max-w-5xl mx-auto p-4 bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Product Image */}
                    <div className="md:w-1/3  flex items-center justify-center bg-gray-50 p-8 md:p-12">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="object-contain max-h-[500px] w-full"
                            loading="lazy"
                            // The onError prop is a React event handler that runs if the image fails to load
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074';
                            }}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            {product.category}
                        </span>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 leading-tight">
                            {product.title}
                        </h1>

                        <div className="mt-4 flex items-center">
                            {renderStars(product.rating.rate)}
                            <span className="ml-2 text-sm text-gray-600">
                                {product.rating.rate} ({product.rating.count} reviews)
                            </span>
                        </div>

                        <p className="text-3xl font-bold text-gray-900 mt-6">
                            ${product.price.toFixed(2)}
                        </p>

                        <div className="mt-6 flex-1">
                            <h2 className="font-semibold text-gray-800 mb-2">Description</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-6 space-y-3">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Edit Product
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
                {product && (
                    <>
                        <EditProductModal
                            product={product}
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                        />
                        <DeleteConfirmationModal
                            productId={productId}
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

