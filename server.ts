import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/generate-scenario", async (req, res) => {
  try {
    const { prompt, temperature = 0.9 } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text(); // récupère le contenu brut
      throw new Error(`Réponse invalide du serveur : ${text}`);
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur Serveur" });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
