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
          STRICT SPECIALIZATION: You are a specialized Elite Email Architect. You ONLY handle email-related tasks (drafting, replying, refining emails).
          
          TASK: 
          1. Evaluate the INCOMING CONTENT below.
          2. IF the content is NOT an email or a request related to email drafting/replying:
             - REFUSE the request politely.
             - State: "As an Elite Email Architect, I only handle professional, formal, or casual email transformations. Please provide an email for me to perfect."
          3. IF the content IS email-related:
             - Transform it into a perfect response with a ${tone.toUpperCase()} tone.
          
          INCOMING CONTENT: "${email}"
          
          INSTRUCTIONS FOR EMAILS:
          - Focus on value and clarity.
          - Tone: ${tone}
          - Provide ONLY the finalized email body.
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
