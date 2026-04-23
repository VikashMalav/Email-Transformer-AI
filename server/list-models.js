const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function run() {
  const apiKey = (process.env.GOOGLE_API_KEY || "").trim();
  if (!apiKey) {
    console.error("❌ ERROR: GOOGLE_API_KEY is not set in .env file.");
    return;
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  console.log("Fetching available models for your API key...");

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API ERROR:", data.error.message);
      return;
    }

    if (!data.models) {
        console.log("No models found or empty response.");
        return;
    }

    console.log("\n✅ AVAILABLE MODELS:");
    data.models.forEach(m => {
      if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
        console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
      }
    });

    console.log("\nDEBUG: Finished.");
  } catch (err) {
    console.error("❌ FAILED TO CONNECT:", err.message);
  }
}

run();
