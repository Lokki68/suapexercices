import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, temperature = 0.9 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Le prompt est requis" });
    }

    console.log("📝 Génération du scénario avec Groq...");

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
      const errorText = await response.text();
      console.error("❌ Erreur Groq:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    console.log("✅ Scénario généré !");

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Erreur:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Erreur serveur interne",
    });
  }
}
