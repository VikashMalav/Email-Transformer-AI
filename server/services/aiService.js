import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const client = new GoogleGenAI({ apiKey: (process.env.GOOGLE_API_KEY || "").trim() });

/**
 * Optimized AI Content Generation with Fallback Logic (Service Layer)
 * This decoupled logic allows for easy testing and model switching.
 */
export const generateEmailResponse = async (email, tone) => {
  const modelsToTry = ["gemini-flash-latest", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const result = await client.models.generateContent({
        model: modelName,
        contents: `
          You are an Elite Email Architect and Communications Expert. 
          Task: Transform the incoming email into a response with a ${tone.toUpperCase()} tone.
          
          INCOMING EMAIL: "${email}"
          
          INSTRUCTIONS:
          1. ANALYZE: Understand the core request and sender's subtext.
          2. ARCHITECTURE: 
             - Avoid AI clichés.
             - Tone: ${tone}
          3. DELIVERY: Provide ONLY the finalized email content. No meta-talk.
        `
      });

      if (result && result.text) {
        return result.text.trim();
      }
    } catch (err) {
      lastError = err;
      console.warn(`[Service] Model ${modelName} failed:`, err.message);

      // Stop retrying if it's a client error (400) like an invalid API key
      if (err.status && err.status < 500) break;
    }
  }

  throw lastError || new Error("AI Generation failed after multiple attempts.");
};
