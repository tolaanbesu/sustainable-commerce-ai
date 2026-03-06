import { getStructuredCompletion } from "../infrastructure/ai/geminiService.js";
import { validateProposal } from "../validators/proposalValidator.js";
import { saveProposal } from "../data/repositories/proposalRepository.js";

export async function generateProposal(input) {
  const prompt = `
Industry: ${input.industry}
Budget: ${input.budget}

Return JSON:
{
  "productMix": [
    {
      "productName": "",
      "quantity": 0,
      "unitCost": 0,
      "totalCost": 0
    }
  ],
  "budgetUsed": 0,
  "remainingBudget": 0,
  "impactSummary": ""
}
`;

  const aiResponse = await getStructuredCompletion(prompt);
  const parsed = JSON.parse(aiResponse);

  validateProposal(parsed, input.budget);

  await saveProposal({
    ...input,
    proposal: parsed,
  });

  return parsed;
}