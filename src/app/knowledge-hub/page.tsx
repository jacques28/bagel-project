// 'use client';

// import React, { useState } from 'react';
// import { bagelClient } from '@/utils/bagelClient';
// import { v4 as uuidv4 } from 'uuid';
// import { z } from 'zod';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Input validation schema
// const inspirationSchema = z.string().min(10).max(1000);

// const KnowledgeHub = () => {
//   const [inspiration, setInspiration] = useState('');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleGenerateRecipe = async () => {
//     try {
//       setIsSubmitting(true);
      
//       // Validate input
//       inspirationSchema.parse(inspiration);

//       const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
//       const userId = process.env.NEXT_PUBLIC_BAGEL_USER_ID;
      
//       if (!apiKey || !userId) throw new Error('Missing API key or User ID');

//       const payload = {
//         dataset_type: "RAW",
//         title: `Bagel Recipe Inspiration: ${inspiration.substring(0, 30)}...`,
//         category: "Bagel Recipes",
//         details: inspiration,
//         tags: ["bagel", "recipe", "inspiration"],
//         userId: userId,
//       };

//       const asset = await bagelClient.create_asset(payload, apiKey);
//       await bagelClient.add_file(asset.id, new Blob([inspiration], {type: 'text/plain'}), apiKey);

//       toast.success('Recipe inspiration submitted successfully!');
//       setInspiration('');
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         toast.error('Invalid input. Please enter between 10 and 1000 characters.');
//       } else if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error('An unexpected error occurred. Please try again.');
//       }
//       console.error('Error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       setSubmissionStatus('Please select a file first.');
//       return;
//     }
//     try {
//       const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
//       if (!apiKey) throw new Error('API key not found');

//       const userId = process.env.NEXT_PUBLIC_BAGEL_USER_ID;
//       if (!userId) throw new Error('User ID not found');

//       const fileReader = new FileReader();
//       fileReader.onload = async (e) => {
//         const fileContent = e.target?.result;
//         if (typeof fileContent === 'string') {
//           const jsonData = JSON.parse(fileContent);
          
//           const payload = {
//             dataset_type: "VECTOR",
//             title: `JSON Upload: ${selectedFile.name}`,
//             category: "Bagel Data",
//             details: "Uploaded JSON data",
//             tags: ["json", "upload"],
//             userId: userId,
//             embedding_model: "bagel-text",
//             dimensions: 768, // Adjust as needed
//           };

//           const asset = await bagelClient.create_asset(payload, apiKey);
          
//           // Add the JSON data to the asset
//           await bagelClient.add_data_to_asset(asset.id, {
//             metadatas: [{ source: "json_upload" }],
//             documents: [JSON.stringify(jsonData)],
//             ids: [uuidv4()],
//           }, apiKey);

//           setSubmissionStatus(`File uploaded and processed successfully! Asset ID: ${asset.id}`);
//         }
//       };
//       fileReader.readAsText(selectedFile);
//     } catch (error) {
//       setSubmissionStatus('Error processing file. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-100 p-4">
//        <ToastContainer />
//       <div className="max-w-3xl mx-auto space-y-6">
//         <header className="bg-[#E35A2F] text-white p-6 rounded-t-lg">
//           <h1 className="text-3xl font-bold">Bagel Knowledge Hub</h1>
//         </header>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//         <textarea
//         value={inspiration}
//         onChange={(e) => setInspiration(e.target.value)}
//         placeholder="Enter your bagel recipe inspiration (10-1000 characters)"
//         className="w-full p-2 border border-gray-300 rounded"
//       />
//       <button
//         onClick={handleGenerateRecipe}
//         disabled={isSubmitting}
//         className={`w-full bg-[#1E293B] text-white p-3 rounded-lg hover:bg-[#334155] transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//       >
//         {isSubmitting ? 'Submitting...' : 'Generate and Submit a bagel recipe inspiration'}
//       </button>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Upload a JSON file with inspiration</h2>
//           <div className="flex items-center justify-between border border-orange-300 rounded-lg p-3">
//             <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">
//               Choose File
//             </label>
//             <input
//               id="file-upload"
//               type="file"
//               accept=".json"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//             <span>{selectedFile ? selectedFile.name : 'no file selected'}</span>
//           </div>
//           <button
//             onClick={handleFileUpload}
//             className="w-full bg-[#1E293B] text-white p-3 mt-4 rounded-lg hover:bg-[#334155] transition duration-300"
//           >
//             Upload and Process JSON File
//           </button>
//         </div>

//         {submissionStatus && (
//           <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
//             {submissionStatus}
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <header className="bg-[#E35A2F] text-white p-4">
//             <h2 className="text-2xl font-bold">Knowledge Contributor Leaderboard</h2>
//           </header>
//           <ul className="divide-y divide-gray-200">
//             {[
//               { name: 'Jeff', score: 450 },
//               { name: 'Elon', score: 400 },
//               { name: 'Sundar', score: 380 },
//               { name: 'Zuck', score: 350 },
//               { name: 'Tim', score: 300 },
//             ].map((contributor, index) => (
//               <li key={index} className="flex justify-between items-center p-4">
//                 <span className="text-lg text-blue-700">{contributor.name}</span>
//                 <span className="text-lg font-semibold">{contributor.score} $BAGEL</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KnowledgeHub;

'use client';

import React, { useState, useEffect } from 'react';
import { bagelClient, createOrFetchVectorAsset, addInspiration, generateRecipeWithFineTunedModel, Asset} from '@/utils/bagelClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import LogoutButton from '../signout/page';



const KnowledgeHub = () => {
  const { data: session, status } = useSession();
  const [inspiration, setInspiration] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipeAssetId, setRecipeAssetId] = useState<string>('');

  useEffect(() => {
    if (session?.user?.id) {
      const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
      if (!apiKey) throw new Error('Missing API key');
      initializeRecipeAsset(apiKey, session.user.id);
    }
  }, [session]);

  const initializeRecipeAsset = async (apiKey: string, userId: string) => {
    try {
      const asset = await createOrFetchVectorAsset(apiKey, userId);
      if (!asset || !asset.id) {
        throw new Error("Failed to retrieve or create asset");
      }
      setRecipeAssetId(asset.id);
      console.log("Asset initialized successfully:", asset);
    } catch (error) {
      console.error("Failed to initialize recipe database:", error);
      toast.error(`Failed to initialize recipe database: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmitInspiration = async () => {
    if (!session) {
      toast.error('Please sign in to submit inspirations');
      return;
    }

    if (!inspiration.trim()) {
      toast.error('Please enter some inspiration');
      return;
    }

    if (!recipeAssetId) {
      toast.error('Recipe asset ID not found. Please wait while the asset is being initialized.');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;
      if (!apiKey || !recipeAssetId) throw new Error('Missing API key or Recipe Asset ID');

      await addInspiration(recipeAssetId, apiKey, inspiration);
      toast.success('Recipe inspiration added successfully!');
      setInspiration('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit inspiration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateRecipe = async () => {
    if (!inspiration.trim()) {
      toast.error('Please enter some inspiration');
      return;
    }

    setIsSubmitting(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_BAGEL_API_KEY;

      if (!apiKey) {
        throw new Error('API key is missing');
      }

      const modelAssetId = "de4ac506-e972-4a82-8527-317921171439"; // Replace with the correct fine-tuned model ID

      if (modelAssetId) {
        const recipe = await generateRecipeWithFineTunedModel(modelAssetId, apiKey, inspiration);
        setGeneratedRecipe(recipe);
        toast.success('Recipe generated successfully!');
      } else {
        throw new Error('Model Asset ID is undefined');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          onClick={handleSubmitInspiration}
          disabled={isSubmitting}
          className={`w-full bg-[#1E293B] text-white p-3 rounded-lg hover:bg-[#334155] transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inspiration'}
        </button>
        <button
          onClick={handleGenerateRecipe}
          disabled={isSubmitting}
          className={`w-full bg-[#E35A2F] text-white p-3 rounded-lg hover:bg-[#d54e23] transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Generating...' : 'Generate Recipe'}
        </button>
        {generatedRecipe && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Generated Recipe:</h2>
            <pre className="whitespace-pre-wrap">{generatedRecipe}</pre>
          </div>
        )}
      </div>
      <LogoutButton />
    </div>
  );
};

export default KnowledgeHub;