export const allowedCategories = [
  "Packaging",
  "Office Supplies",
  "Personal Care",
  "Food & Beverage",
  "Cleaning",
  "Apparel",
];

const allowedFilters = [
  "plastic-free",
  "compostable",
  "vegan",
  "recycled",
  "biodegradable",
  "carbon-neutral",
  "locally-sourced",
  "sustainable material",
  "sustainable materials",   
  "renewable resource",      
];

export function validateCategoryOutput(data) {
  if (!allowedCategories.includes(data.primaryCategory)) {
    throw new Error("Invalid primary category");
  }

  if (data.seoTags.length < 5 || data.seoTags.length > 10) {
    throw new Error("SEO tag count must be between 5 and 10");
  }

  data.sustainabilityFilters = data.sustainabilityFilters.map(f => f.toLowerCase());
}