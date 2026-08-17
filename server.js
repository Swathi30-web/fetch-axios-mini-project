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

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Fetch Axios API is running",
  });
});

// Get all resources
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

// Get single item
app.get("/:resource/:id", (req, res) => {
  const db = getDB();

  const resource = req.params.resource;
  const id = req.params.id;

  if (!db[resource]) {
    return res.status(404).json({
      message: `Resource '${resource}' not found`,
    });
  }

  const item = db[resource].find(
    (item) => String(item.id) === String(id)
  );

  if (!item) {
    return res.status(404).json({
      message: `${resource} with id ${id} not found`,
    });
  }

  res.json(item);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});