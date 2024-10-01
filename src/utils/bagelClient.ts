import { Settings, Client } from "bagelml";

// Initialize Bagel client with settings
const settings = new Settings({
  bagel_api_impl: "rest",
  bagel_server_host: "api.bageldb.ai",
});

export const bagelClient = new Client(settings);

export const getOrCreateSharedAsset = async (apiKey: string, userId: string): Promise<string> => {
  try {
    const assets = await bagelClient.get_all_assets(userId, apiKey);
    console.log("Retrieved assets:", assets); // For debugging

    let sharedAsset = assets.find((asset: any) => asset.title === 'Shared Bagel Recipes');

    if (!sharedAsset) {
      const newAsset = await bagelClient.create_asset({
        dataset_type: "VECTOR",
        title: "Shared Bagel Recipes",
        category: "Recipes",
        details: "Shared asset for bagel recipes",
        tags: ["bagel", "recipe"],
        userId: userId,
        embedding_model: "bagel-text",
        dimensions: 768
      }, apiKey);
      console.log("Created new asset:", newAsset); // For debugging
      sharedAsset = newAsset;
    }

    // Check if sharedAsset is a string (just the ID) or an object
    if (typeof sharedAsset === 'string') {
      return sharedAsset;
    } else if (sharedAsset && typeof sharedAsset === 'object' && 'id' in sharedAsset) {
      return sharedAsset.id;
    } else {
      throw new Error("Invalid asset structure returned from API");
    }
  } catch (error) {
    console.error("Error in getOrCreateSharedAsset:", error);
    throw error;
  }
};

// Add recipes from uploaded file
export const addRecipeFromFile = async (assetId: string, apiKey: string, file: File) => {
  try {
    const fileContent = await file.text();
    let recipes: { title: string, ingredients: string, instructions: string }[];

    if (file.type === 'application/json') {
      recipes = JSON.parse(fileContent);
    } else {
      // Assume text file contains one recipe
      recipes = [{
        title: 'Uploaded Recipe',
        ingredients: fileContent,
        instructions: 'Instructions not provided'
      }];
    }

    const payload = {
      metadatas: recipes.map(recipe => ({ source: "file_upload", ...recipe })),
      documents: recipes.map(recipe => `${recipe.title}\n${recipe.ingredients}\n${recipe.instructions}`),
      ids: recipes.map(() => Date.now().toString() + Math.random().toString(36).substr(2, 9)),
    };

    return await bagelClient.add_data_to_asset(assetId, payload, apiKey);
  } catch (error) {
    console.error("Error adding recipes from file:", error);
    throw error;
  }
};

// Generate a recipe based on user input
export const generateRecipe = async (assetId: string, apiKey: string, inspiration: string) => {
  try {
    const payload = {
      queries: [inspiration],
      n_results: 1,
      include: ["metadatas", "documents", "distances"]
    };

    const response = await bagelClient.query_asset(assetId, payload, apiKey);

    if (response && response.metadatas && response.metadatas.length > 0) {
      const recipe = response.metadatas[0];
      return `Title: ${recipe.title}\nIngredients: ${recipe.ingredients}\nInstructions: ${recipe.instructions}`;
    } else {
      return "No matching recipe found. Try a different inspiration!";
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};

// Function to add individual inspiration text as embeddings
export const addInspiration = async (assetId: string, apiKey: string, inspiration: string) => {
  const payload = {
    metadatas: [{ source: "user_input" }],
    documents: [inspiration],  // Add inspiration text as document
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
