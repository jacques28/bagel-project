// File: scripts/testBagelApi.ts

import { Settings, Client } from "bagelml"; // Ensure bagelml is correctly installed

// Replace with your actual API key and User ID
const apiKey = "4PHhUofrYgFeRrKZt5S5ioi6fb7A4SR1";
const userId = "104875968884847148312";

// Configure Bagel API settings
const settings = new Settings({
  bagel_api_impl: "rest",
  bagel_server_host: "api.bageldb.ai",
});

// Create a client instance with settings
const client = new Client(settings);

async function testApi() {
  try {
    // Create a new asset
    const asset = await client.create_asset(
      {
        dataset_type: "VECTOR",
        title: "Test Asset",
        category: "Test",
        details: "This is a test asset",
        tags: ["test"],
        userId: userId,
        embedding_model: "bagel-text",
        dimensions: 768,
      },
      apiKey
    );

    console.log("Asset created:", asset);

    // Additional API tests can be added here
  } catch (error) {
    console.error("API test failed:", error);
  }
}

// Call the test function
testApi();
