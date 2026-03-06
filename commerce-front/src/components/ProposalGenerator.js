import React, { useState } from "react";
import { generateProposalAPI } from "../api";

function ProposalGenerator() {
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState(null);

  const generateProposal = async () => {
    try {
      const data = await generateProposalAPI({
        industry,
        budget: Number(budget),
      });

      setResult(data);
    } catch (err) {
      alert("Error generating proposal");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2 className="title">AI B2B Proposal Generator</h2>

      <label>Industry</label>
      <input
        className="input"
        placeholder="Example: Eco-friendly Personal Care"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />

      <label>Budget</label>
      <input
        className="input"
        placeholder="Example: 10000"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <button className="button" onClick={generateProposal}>
        Generate Proposal
      </button>

      {result && (
        <pre className="result">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default ProposalGenerator;
