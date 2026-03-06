import React, { useState } from "react";
import { generateCategoryAPI } from "../api"

function CategoryGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);

  const generateCategory = async () => {
    try {
      const data = await generateCategoryAPI({
        name,
        description,
      });

      setResult(data);
    } catch (err) {
      alert("Error generating category");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2 className="title">AI Auto Category Generator</h2>

      <label>Product Name</label>
      <input
        className="input"
        placeholder="Example: Bamboo Toothbrush"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Product Description</label>
      <textarea
        className="textarea"
        placeholder="Eco friendly toothbrush made from biodegradable bamboo"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="button" onClick={generateCategory}>
        Generate Category
      </button>

      {result && (
        <pre className="result">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default CategoryGenerator;


