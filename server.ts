import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-scenario", async (req, res) => {
  try {
    const { prompt, temperature = 0.9 } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: temperature,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Erreur Groq:", text);
      return res.status(response.status).json({ error: text });
    }

    let data;
    try {
      data = await response.json();
      console.log("Scénario générer avec succès");
    } catch {
      const text = await response.text();
      console.error("Erreur server : ", text);
      throw new Error(`Réponse invalide du serveur : ${text}`);
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur Serveur" });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
