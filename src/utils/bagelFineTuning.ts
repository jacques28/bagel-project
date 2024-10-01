import { bagelClient } from './bagelClient';

export const fineTuneModel = async (apiKey: string, userId: string, rawAssetId: string) => {
  const payload = {
    dataset_type: "MODEL",
    title: "Bagel Recipe Generator",
    category: "Recipe Models",
    details: "Fine-tuned model for generating bagel recipes",
    tags: ["bagel", "recipe", "model"],
    userId: userId,
    fine_tune_payload: {
      asset_id: rawAssetId,
      model_name: "bagel-recipe-generator",
      base_model: "de4ac506-e972-4a82-8527-317921171439", //base model ID from Bagel marketplace
      file_name: "bagel_recipes.txt", // Your training data file in the RAW asset
      userId: userId,
    },
  };

  try {
    const response = await bagelClient.fine_tune(payload, apiKey);
    console.log('Fine-tune response:', response);
    if (!response || !response.modelAssetId) {
      throw new Error('Fine-tuning response does not contain a valid modelAssetId');
    }
    return response;
  } catch (error) {
    console.error('Error fine-tuning model:', error);
    throw error;
  }
};

// Generate a recipe with the fine-tuned model
export const generateRecipeWithModel = async (modelAssetId: string, apiKey: string, prompt: string) => {
  const payload = {
    model_id: "de4ac506-e972-4a82-8527-317921171439",
    inputs: prompt,
  };

  try {
    const response = await bagelClient.query_asset(modelAssetId, payload, apiKey);
    return response.generated_text;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};
