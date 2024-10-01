'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { getOrCreateSharedAsset, generateRecipe, addRecipeFromFile } from '@/utils/bagelClient';
import { fineTuneModel, generateRecipeWithModel } from '@/utils/bagelFineTuning';
import { signIn } from 'next-auth/react';
import LogoutButton from '../signout/page';

const KnowledgeHub = () => {
  const { data: session, status } = useSession();
  const [inspiration, setInspiration] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipeAssetId, setRecipeAssetId] = useState('');
  const [isFineTuning, setIsFineTuning] = useState(false);
  const [fineTunedModelId, setFineTunedModelId] = useState('');
  const [assetId, setAssetId] = useState('');
  
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
      
      if (!apiKey) {
        console.error('API key is missing. Please check your environment variables.');
        return;
      }      
  
      const initializeSharedAsset = async () => {
        try {
          const assetId = await getOrCreateSharedAsset(apiKey, session.user.id);
          setRecipeAssetId(assetId);
          console.log("Asset initialized successfully:", assetId);
        } catch (error: any) {
          console.error("Failed to initialize shared asset:", error.message);
          toast.error("Failed to initialize shared asset: " + error.message);
        }
      };
  
      initializeSharedAsset();
    }
  }, [session]);
  
  const handleGenerateRecipe = async () => {
    setIsSubmitting(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
      if (!apiKey || !recipeAssetId) throw new Error('API key or asset ID is missing');
      
      const recipe = await generateRecipe(recipeAssetId, apiKey, inspiration);
      setGeneratedRecipe(recipe);
      toast.success('Recipe generated successfully!');
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error('Failed to generate recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFineTune = async () => {
    setIsFineTuning(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
      if (!apiKey || !session?.user?.id) throw new Error('Missing API key or user ID');
      const result = await fineTuneModel(apiKey, session.user.id, recipeAssetId);
      if (result && result.modelAssetId) {
        setFineTunedModelId(result.modelAssetId);
        toast.success('Model fine-tuning completed!');
      } else {
        throw new Error('Fine-tuning did not return a valid model asset ID');
      }
    } catch (error) {
      console.error('Fine-tuning error:', error);
      toast.error('Failed to fine-tune model. Please try again.');
    } finally {
      setIsFineTuning(false);
    }
  };
  

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('Please choose a file to upload');
      return;
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
      if (!apiKey || !recipeAssetId) {
        throw new Error('API key or asset ID is missing');
      }

      await addRecipeFromFile(recipeAssetId, apiKey, file);
      toast.success('File uploaded and recipes added successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file. Please try again.');
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-blue-100 p-4 flex items-center justify-center">
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign in to use Bagel Knowledge Hub
        </button>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <ToastContainer />
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Bagel Recipe Generator</h1>
        <textarea
          value={inspiration}
          onChange={(e) => setInspiration(e.target.value)}
          placeholder="Enter your bagel recipe inspiration"
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
        <button
          onClick={handleGenerateRecipe}
          disabled={isSubmitting}
          className={`w-full bg-[#E35A2F] text-white p-3 rounded-lg hover:bg-[#d54e23] transition duration-300 ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? 'Generating Recipe...' : 'Generate Recipe'}
        </button>
        <button
        onClick={handleFineTune}
        disabled={isFineTuning}
        className={`w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-300 ${isFineTuning ? 'opacity-50' : ''}`}
      >
        {isFineTuning ? 'Fine-tuning Model...' : 'Fine-tune Model'}
      </button>

        {generatedRecipe && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold">Generated Recipe:</h2>
            <p>{generatedRecipe}</p>
          </div>
        )}
        <div className="flex items-center space-x-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={handleFileUpload}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Upload Recipe File
          </button>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default KnowledgeHub;
