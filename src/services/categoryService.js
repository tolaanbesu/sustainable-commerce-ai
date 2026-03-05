import { getStructuredCompletion } from "../infrastructure/ai/geminiService.js";
import { validateCategoryOutput, allowedCategories } from "../validators/categoryValidator.js";
import { saveProduct } from "../data/repositories/productRepository.js";

export async function generateCategory(product) {
  const prompt = `
Choose primaryCategory ONLY from:
${allowedCategories.join(", ")}

Product:
Name: ${product.name}
Description: ${product.description}

Return JSON:
{
  "primaryCategory": "",
  "subCategory": "",
  "seoTags": [],
  "sustainabilityFilters": []
}
`;

  const aiResponse = await getStructuredCompletion(prompt);
  const parsed = JSON.parse(aiResponse);

  validateCategoryOutput(parsed);

  await saveProduct({
    ...product,
    ...parsed,
  });

  return parsed;
}