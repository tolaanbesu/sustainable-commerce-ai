import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { logAIInteraction } from "../logging/aiLogger.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = "gemini-2.5-flash";


// Convert AI output into Firestore-safe JSON
function sanitizeAIResponse(text) {
  try {
    if (!text) throw new Error("Empty AI response");

    // If text is already an object, return it
    if (typeof text === "object") return text;

    // Remove code block markers and extra lines before JSON
    let cleaned = text.replace(/```json|```/gi, "").trim();

    // Keep only the JSON part starting from first '{'
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON object found in AI response");
    }

    cleaned = cleaned.substring(firstBrace, lastBrace + 1);

    // Parse to JS object
    return JSON.parse(cleaned);

  } catch (err) {
    console.error("Failed to parse AI JSON:", text);
    throw new Error("AI returned invalid JSON");
  }
}



export async function getStructuredCompletion(prompt) {

  try {

    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt is empty");
    }

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME
    });

    const result = await model.generateContent(
      "You are a structured AI for sustainable commerce. Always return ONLY valid JSON. No markdown. No explanation.\n\n" +
      prompt
    );

    if (!result || !result.response) {
      throw new Error("AI returned empty response");
    }

    const rawOutput = result.response.text();
     
    if (!rawOutput) {
      throw new Error("AI response text is empty");
    }

    // Logging requirement
    await logAIInteraction(prompt, rawOutput);

    // Convert to clean JSON
    const parsed = sanitizeAIResponse(rawOutput);

    return rawOutput;

  } catch (error) {

    console.error("Error in getStructuredCompletion:", error);

    throw error;

  }
}





// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";
// import { logAIInteraction } from "../logging/aiLogger.js";

// dotenv.config();

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // Try using a valid text‑generation model like gemini‑2.0‑flash or gemini‑2.5‑flash
// const MODEL_NAME = "gemini-2.5-flash";

// export async function getStructuredCompletion(prompt) {
//   const response = await ai.models.generateContent({
//     model: MODEL_NAME,
//     contents: [
//       {
//         role: "system",
//         text: "You are a structured AI for sustainable commerce. Return ONLY valid JSON.",
//       },
//       {
//         role: "user",
//         text: prompt,
//       },
//     ],
//   });

//   const content = response.text;

//   await logAIInteraction(prompt, content);

//   return content;
// }

// import OpenAI from "openai";
// import dotenv from "dotenv";
// import { logAIInteraction } from "../logging/aiLogger.js";

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function getStructuredCompletion(prompt) {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     response_format: { type: "json_object" },
//     temperature: 0.2,
//     messages: [
//       { role: "system", content: "You are a structured AI for sustainable commerce." },
//       { role: "user", content: prompt },
//     ],
//   });

//   const content = response.choices[0].message.content;

//   await logAIInteraction(prompt, content);

//   return content;
// }