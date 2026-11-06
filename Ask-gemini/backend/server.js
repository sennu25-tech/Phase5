
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/health", (req, res) => {
  res.send({ message: "Ask Gemini server is running!" });
});

app.post("/api/ask", async (req, res) => {
  try {
    const question = req.body?.question?.trim();

    if (!question) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    if (question.length > 1000) {
      return res.status(400).json({
        error: "Question must be under 1000 characters."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is missing."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question
    });

    const answer = response.text;

    if (!answer) {
      return res.status(502).json({
        error: "Gemini returned an empty answer."
      });
    }

    res.status(200).json({ answer });

  } catch (error) {
    console.error("Gemini error:", error.message);

    res.status(500).json({
      error: "Unable to get an answer. Please try again."
    });
  }
});

app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found."
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
