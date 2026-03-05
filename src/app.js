import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import catalogController from "./controllers/catalogController.js";
import proposalController from "./controllers/proposalController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/catalog", catalogController);
app.use("/api/proposal", proposalController);

app.get("/", (req, res)=> {
  res.send("Sustainable Commerce API is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});