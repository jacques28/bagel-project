# Bagel Recipe Generator

## Overview

The **Bagel Project** is a hackathon project where we utilize **Bakery**, a platform powered by Bagel, to build, manage, and monetize models and datasets. The application allows users to generate bagel recipes based on user inspiration by integrating with the [Bagel API](https://api.bageldb.ai/). It enables the storage, management, and querying of vector assets to generate custom AI-powered recipes.

## Features

- **Sign In with Google**: Uses NextAuth for authentication, allowing users to sign in with Google.
- **Recipe Inspiration**: Users can submit their bagel recipe inspirations which are stored as vector embeddings.
- **AI-Powered Recipe Generation**: The application queries a fine-tuned AI model to generate a recipe based on the provided inspiration.
- **Vector Asset Management**: Uses the Bagel API to manage assets for storing and querying recipe inspiration.
- **File Upload**: Allows uploading files related to the project (optional).

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js >= 14.x
- npm or yarn
- [Bagel API](https://api.bageldb.ai/) Account

### Step-by-Step Setup

1. Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd bagel-recipe-generator
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Install additional dependencies for BagelML:
    ```bash
    npm install axios node-fetch form-data uuid buffer
    ```

4. Create a `.env.local` file in the root directory with the following environment variables:
    ```bash
    NEXT_PUBLIC_BAGEL_API_KEY=<your-bagel-api-key>
    NEXT_PUBLIC_BAGEL_USER_ID=<your-user-id>
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    NEXTAUTH_URL=<your-application-url>
    NEXTAUTH_SECRET=<your-nextauth-secret>
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Configuration

### Environment Variables

In your `.env.local` file, set up the following keys:

- `NEXT_PUBLIC_BAGEL_API_KEY`: Your API key from the Bagel platform.
- `NEXT_PUBLIC_BAGEL_USER_ID`: Your Bagel user ID.
- `GOOGLE_CLIENT_ID`: Google Client ID for OAuth.
- `GOOGLE_CLIENT_SECRET`: Google Client Secret for OAuth.
- `NEXTAUTH_URL`: The base URL of your application.
- `NEXTAUTH_SECRET`: A random string for securing sessions.

### Bagel API Keys

You must obtain an API key from BagelDB to interact with the platform. Visit [BagelDB](https://api.bageldb.ai/) and create an account to generate your API key.

### Google OAuth Keys

To enable Google sign-in, you will need to set up a Google OAuth 2.0 Client in the [Google Cloud Console](https://console.cloud.google.com/).

## Usage

### 1. Sign In

Users must sign in with their Google account before using the app. Click the **Sign In** button on the home page.

### 2. Generate Bagel Recipe

After signing in:

- Enter your bagel inspiration in the text box.
- Click **Generate Recipe**.
- The AI will process your inspiration and return a recipe based on your input.

### 3. Logout

To log out of the application, simply click the **Logout** button in the top left corner.

### Project Structure

```plaintext
├── src
│   ├── app
│   │   └── knowledge-hub
│   │       └── page.tsx         # Main page for the Bagel Recipe Generator
│   ├── utils
│   │   ├── bagelClient.ts       # Utility functions for interacting with the Bagel API
│   │   └── bagelFineTuning.ts   # Fine-tuning utility for the Bagel API
│   ├── types
│   │   └── bagelml.d.ts         # TypeScript definitions for Bagel API
│   └── pages
│       └── signout              # Component to handle logout
├── .env.local                   # Environment variables for API keys and app secrets
├── package.json                 # Project metadata and dependencies
└── README.md                    # Project documentation
