export function validateProposal(proposal, maxBudget) {
  if (!proposal.productMix || !Array.isArray(proposal.productMix)) {
    throw new Error("Product mix missing or invalid");
  }

  proposal.productMix.forEach(item => {
    if (!item.productName || item.quantity <= 0 || item.unitCost <= 0 || item.totalCost <= 0) {
      throw new Error(`Invalid product item: ${JSON.stringify(item)}`);
    }
  });

  if (proposal.budgetUsed > maxBudget) {
    throw new Error(`Budget exceeded: ${proposal.budgetUsed} > ${maxBudget}`);
  }

  if (proposal.remainingBudget < 0) {
    throw new Error("Remaining budget cannot be negative");
  }

  if (!proposal.impactSummary || proposal.impactSummary.length < 20) {
    throw new Error("Impact summary missing or too short");
  }
}

