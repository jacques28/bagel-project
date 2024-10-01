import { Settings, Client } from "bagelml";

const settings = new Settings({
  bagel_api_impl: "rest",
  bagel_server_host: "api.bageldb.ai",
});

const client = new Client(settings);

const apiKey = "4PHhUofrYgFeRrKZt5S5ioi6fb7A4SR1";
const payload = {
  dataset_type: "VECTOR",
  title: "Test Asset",
  category: "Testing",
  details: "This is a test asset for vector dataset.",
  tags: ["test", "vector", "dataset"],
  userId: "104875968884847148312",
  embedding_model: "bagel-text",
  dimensions: 768,
};

const createAndFetchAsset = async () => {
  try {
    console.log("Creating asset...");
    const assetId = await client.create_asset(payload, apiKey);
    
    if (typeof assetId === 'string' && assetId.length > 0) {
      console.log("Asset created successfully!");
      console.log("Asset ID:", assetId);
      
      // Proceed with using this assetId for further operations
      await fetchAssetDetails(assetId);
      await fetchAllAssets();
    } else {
      console.log("Asset creation failed or no valid ID received.");
    }
  } catch (error) {
    console.error("Error creating asset:", error.message);
  }
};

const fetchAssetDetails = async (assetId) => {
  try {
    console.log("Fetching asset details...");
    const assetDetails = await client.get_asset_by_Id(assetId, apiKey);
    console.log("Asset details:", assetDetails);
  } catch (error) {
    console.error("Error fetching asset details:", error.message);
  }
};

const fetchAllAssets = async () => {
  try {
    console.log("Fetching all assets...");
    const allAssets = await client.get_all_assets(payload.userId, apiKey);
    console.log("All assets:", allAssets);
  } catch (error) {
    console.error("Error fetching all assets:", error.message);
  }
};

createAndFetchAsset();