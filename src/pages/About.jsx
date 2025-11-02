// src/pages/About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
    const Navigate = useNavigate();
    return (
        <div className='bg-gray-900'>
            <button
                onClick={() => Navigate(-1)}
                className="mt-7 ml-5 text-blue-600 font-medium border border-blue-600 px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
            >
                ← Back
            </button>

            <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6">

                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            About <span className="text-blue-400">Product Store</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                            A high-performance React dashboard for managing products from the Product Store API.
                        </p>
                    </div>

                    {/* Section 1: Project Overview */}
                    <div className="mb-16 flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                            <div className="text-gray-300 leading-relaxed">
                                This application demonstrates modern React best practices including:
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
                                    <li>Secure user authentication (login required)</li>
                                    <li>Real-time product management (view, edit, delete)</li>
                                    <li>Optimistic UI updates with cache synchronization</li>
                                    <li>Responsive design using Tailwind CSS</li>
                                    <li>Efficient data fetching with Redux Toolkit Query</li>
                                </ul>
                            </div>
                        </div>
                        <div>------------------------------------------------</div>
                    </div>

                    {/* Section 2: Tech Stack */}
                    <div className="mb-16 flex flex-col md:flex-row-reverse gap-8 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                            <div className="text-gray-300 leading-relaxed">
                                Built with industry-standard tools:
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
                                    <li><strong>React</strong> – Declarative UI</li>
                                    <li><strong>Redux Toolkit + RTK Query</strong> – State & caching</li>
                                    <li><strong>Tailwind CSS</strong> – Utility-first styling</li>
                                    <li><strong>Vite</strong> – Blazing-fast dev server</li>
                                    <li><strong>Product Store API</strong> – Realistic product data</li>
                                </ul>
                            </div>
                        </div>
                        <div>------------------------------------------------</div>

                    </div>

                    {/* Section 3: Assignment Compliance */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-4 text-center">Assignment Requirements Met</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {[
                                "✅ Simple Login Page",
                                "✅ Product List & Detail View",
                                "✅ Edit & Delete with Cache Update",
                                "✅ Skeleton Loaders",
                                "✅ Responsive Tailwind UI",
                                "✅ RTK Query + Auto Revalidation",
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                    <p className="text-gray-200">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Closing Note */}
                    <div className="text-center">
                        <p className="text-gray-400 italic">
                            Built with ❤️ to demonstrate React, Redux, and modern frontend engineering.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}