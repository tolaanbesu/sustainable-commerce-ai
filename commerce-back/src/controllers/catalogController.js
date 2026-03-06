import express from "express";
import { generateCategory } from "../services/categoryService.js";

const router = express.Router();

router.post("/auto-category", async (req, res) => {
  try {
    const result = await generateCategory(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;