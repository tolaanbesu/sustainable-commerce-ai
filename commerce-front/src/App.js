import React from "react";
import CategoryGenerator from "./components/CategoryGenerator";
import ProposalGenerator from "./components/ProposalGenerator";
import "./styles.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">AI Sustainable Commerce System</h1>

      <CategoryGenerator />

      <ProposalGenerator />
    </div>
  );
}

export default App;
