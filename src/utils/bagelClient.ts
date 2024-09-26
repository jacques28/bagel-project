import { Settings, Client } from "bagelml";

// Initialize Bagel client with settings
const settings = new Settings({
  bagel_api_impl: "rest",
  bagel_server_host: "api.bageldb.ai",
});

export const bagelClient = new Client(settings);

export const createOrFetchVectorAsset = async (apiKey: string, userId: string) => {
  const assetName = "Bagel Recipe Inspirations";

  try {
    // Fetch all assets for the user
    const existingAssets = await bagelClient.get_all_assets(userId, apiKey);

    // Check if datasets exist and are an array
    if (existingAssets && Array.isArray(existingAssets.datasets)) {
      // Check if the asset already exists
      const existingAsset = existingAssets.datasets.find(
        (asset: any) => asset.title === assetName
      );

      if (existingAsset) {
        console.log("Asset found:", existingAsset);
        return existingAsset; // Return the existing asset
      }
    } else {
      console.log("No datasets found in the response.");
    }

    // Create a new asset if it doesn't exist
    const payload = {
      dataset_type: "VECTOR",
      title: assetName,
      category: "Recipes",
      details: "Vector storage for bagel recipe inspirations",
      tags: ["bagel", "recipe", "vector"],
      userId: userId,
      embedding_model: "bagel-text",
      dimensions: 768,
    };

    const createdAsset = await bagelClient.create_asset(payload, apiKey);

    if (createdAsset && createdAsset.id) {
      console.log("Asset created:", createdAsset);
      return createdAsset;
    } else {
      throw new Error("Asset creation failed.");
    }
  } catch (error) {
    console.error("Error in createOrFetchVectorAsset:", error);
    throw error;
  }
};

const deleteAsset = async (assetId: string, apiKey: string) => {
  try {
    const response = await bagelClient.delete_asset(assetId, apiKey);
    console.log("Asset deleted:", response);
  } catch (error) {
    console.error("Error deleting asset:", error);
    throw error;
  }
};

export const uploadFileToAsset = async (assetId: string, filePath: string, apiKey: string) => {
  try {
    const response = await bagelClient.add_file(assetId, filePath, apiKey);
    console.log("File uploaded:", response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Function to query the fine-tuned model for recipe generation
export const generateRecipeWithFineTunedModel = async (modelAssetId: string, apiKey: string, prompt: string) => {
  const payload = {
    model_id: "de4ac506-e972-4a82-8527-317921171439",  // The asset ID of your fine-tuned model
    inputs: prompt,  // The inspiration text you want to use for generating a recipe
  };

  try {
    const response = await bagelClient.query_asset(modelAssetId, payload, apiKey);
    return response.generated_text;  // Assuming the Bagel API returns the generated recipe text
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};

export const uploadProductCatalog = async (assetId: string, apiKey: string, filePath: string) => {
  try {
    const response = await bagelClient.add_file(assetId, filePath, apiKey);
    console.log("File uploaded:", response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const addInspiration = async (assetId: string, apiKey: string, inspiration: string) => {
  const payload = {
    metadatas: [{ source: "user_input" }],
    documents: [inspiration],
    ids: [Date.now().toString()],  // Generate a unique ID based on the current timestamp
  };

  try {
    const response = await bagelClient.add_data_to_asset(assetId, payload, apiKey);
    console.log("Embedding added:", response);
    return response;
  } catch (error) {
    console.error("Error adding embedding:", error);
    throw error;
  }
};

export const downloadProductFile = async (assetId: string, apiKey: string, fileName: string) => {
  try {
    const response = await bagelClient.download_model_file(assetId, fileName, apiKey);
    console.log("File downloaded:", response);
    return response;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};

export const queryAsset = async (assetId: string, apiKey: string, queryText: string) => {
  const payload = {
    where: {},
    where_document: {},
    query_texts: [queryText],
    n_results: 1,
    include: ["metadatas", "documents", "distances"],
  };

  try {
    const response = await bagelClient.query_asset(assetId, payload, apiKey);
    console.log("Query result:", response);
    return response;
  } catch (error) {
    console.error("Error querying asset:", error);
    throw error;
  }
};

