import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { logAIInteraction } from "../logging/aiLogger.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = "gemini-2.5-flash";

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

    await logAIInteraction(prompt, rawOutput);

    return rawOutput;

  } catch (error) {

    console.error("Error in getStructuredCompletion:", error);

    throw error;

  }
}
