// src/screens/PageNotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for does not exist.</p>
        <Link
          to="/"
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
