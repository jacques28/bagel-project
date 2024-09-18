'use client';

import React, { useState } from 'react';

const KnowledgeHub = () => {
  const [inspiration, setInspiration] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleGenerateRecipe = () => {
    // Implement recipe generation logic
    console.log('Generating recipe with inspiration:', inspiration);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="bg-[#E35A2F] text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold">Bagel Knowledge Hub</h1>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            value={inspiration}
            onChange={(e) => setInspiration(e.target.value)}
            placeholder="Type something for inspiration"
            className="w-full p-3 border border-orange-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateRecipe}
            className="w-full bg-[#1E293B] text-white p-3 rounded-lg hover:bg-[#334155] transition duration-300"
          >
            Generate a bagel recipe
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upload a JSON file with inspiration</h2>
          <div className="flex items-center justify-between border border-orange-300 rounded-lg p-3">
            <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <span>{selectedFile ? selectedFile.name : 'no file selected'}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <header className="bg-[#E35A2F] text-white p-4">
            <h2 className="text-2xl font-bold">Knowledge Contributor Leaderboard</h2>
          </header>
          <ul className="divide-y divide-gray-200">
            {[
              { name: 'Jeff', score: 450 },
              { name: 'Elon', score: 400 },
              { name: 'Sundar', score: 380 },
              { name: 'Zuck', score: 350 },
              { name: 'Tim', score: 300 },
            ].map((contributor, index) => (
              <li key={index} className="flex justify-between items-center p-4">
                <span className="text-lg text-blue-700">{contributor.name}</span>
                <span className="text-lg font-semibold">{contributor.score} $BAGEL</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;