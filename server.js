import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

const getDB = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

app.get("/", (req, res) => {
  res.json({
    message: "Fetch Axios API is running",
  });
});

app.get("/:resource", (req, res) => {
  const db = getDB();
  const resource = req.params.resource;

  if (!db[resource]) {
    return res.status(404).json({
      message: `Resource '${resource}' not found`,
    });
  }

  res.json(db[resource]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});