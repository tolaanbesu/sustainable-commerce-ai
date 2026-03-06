import db from "../../data/firebase.js";

export async function logAIInteraction(prompt, response) {
  await db.collection("ai_logs").add({
    prompt,
    response,
    timestamp: new Date(),
  });
}