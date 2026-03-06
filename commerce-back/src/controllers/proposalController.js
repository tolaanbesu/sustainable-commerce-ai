import express from "express";
import { generateProposal } from "../services/proposalService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const result = await generateProposal(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;