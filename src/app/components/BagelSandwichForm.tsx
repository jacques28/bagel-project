'use client';

import React, { useState } from 'react';

const BagelSandwichForm: React.FC = () => {
  const [recipe, setRecipe] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting recipe:', recipe);
    // Implement submission logic here
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-[#E35A2F] text-white p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Share your unique knowledge of bagel sandwiches 🥯</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <textarea
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            placeholder="Imagine your perfect bagel sandwich in glorious detail..."
            className="w-full h-48 md:h-64 p-4 text-lg border border-gray-300 rounded resize-none focus:ring-2 focus:ring-[#E35A2F] focus:border-transparent"
          />
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button type="button" className="bg-red-500 text-white px-6 py-3 rounded text-lg hover:bg-red-600 transition duration-300">
              Create an image for your recipe
            </button>
            <button type="submit" className="bg-blue-900 text-white px-6 py-3 rounded text-lg hover:bg-blue-800 transition duration-300 flex items-center justify-center">
              Publish Securely
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
        <div className="bg-blue-50 p-6 rounded-lg m-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Why share your bagel wisdom?</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-lg">
              <span className="text-red-500 mr-3 text-2xl">🏆</span>
              <span className="text-blue-800">Gain recognition for your culinary creativity</span>
            </li>
            <li className="flex items-center text-lg">
              <span className="text-red-500 mr-3 text-2xl">📚</span>
              <span className="text-blue-800">Preserve your legacy in the world of bagels</span>
            </li>
            <li className="flex items-center text-lg">
              <span className="text-red-500 mr-3 text-2xl">💰</span>
              <span className="text-blue-800">Make money from your craft</span>
            </li>
            <li className="flex items-center text-lg">
              <span className="text-red-500 mr-3 text-2xl">👥</span>
              <span className="text-blue-800">Join a vibrant community of bagel enthusiasts</span>
            </li>
          </ul>
        </div>
        console.log(NEXT_PUBLIC_BAGEL_USER_ID);
      </div>
    </div>
  );
};

export default BagelSandwichForm;