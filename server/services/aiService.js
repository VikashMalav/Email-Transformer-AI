import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const client = new GoogleGenAI({ apiKey: (process.env.GOOGLE_API_KEY || "").trim() });

/**
 * Optimized AI Content Generation with Fallback Logic (Service Layer)
 * This decoupled logic allows for easy testing and model switching.
 */
export const generateEmailResponse = async (history, message, tone) => {
  const modelsToTry = ["gemini-3.1-flash-lite-preview", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError = null;

  // Format system instruction for the current context
  const systemInstruction = `You are the world's leading Elite Email Strategist and Architect. 
  
  CORE MISSION: Transform raw thoughts or emails into 10/10 professional communications with a ${tone.toUpperCase()} tone.
  
  STRICT RULES:
  1. Provide exactly ONE high-quality email response. Do not give options.
  2. Format the response strictly with a "Subject:" line followed by the "Body".
  3. Use professional placeholders (e.g., [Your Name], [Project Name]) where necessary.
  4. NO conversational filler, NO introductory "Here is your email", and NO follow-up questions.
  5. If the user input is not email-related, politely but firmly explain that your expertise is strictly limited to perfecting professional email communications.
  6. Focus on extreme clarity, impact, and precise tone adherence.`;

  // Construct the contents for the API
  const contents = history.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  // Add the new message with the system context prepended if it's the first message
  const userContent = history.length === 0
    ? `${systemInstruction}\n\nINCOMING EMAIL/REQUEST: "${message}"`
    : message;

  contents.push({ role: 'user', parts: [{ text: userContent }] });

  for (const modelName of modelsToTry) {
    try {
      const result = await client.models.generateContent({
        model: modelName,
        contents: contents,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      });

      if (result && result.text) {
        return result.text.trim();
      }
    } catch (err) {
      lastError = err;
      console.warn(`[Service] Model ${modelName} failed:`, err.message);
      if (err.status && err.status < 500) break;
    }
  }

  throw lastError || new Error("AI Generation failed.");
};
