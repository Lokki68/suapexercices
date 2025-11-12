import type { Scenario } from "@/types/Types";
import { useState } from "react";

interface UseScenarioGeneratorResult {
  scenario: Scenario | null;
  loading: boolean;
  error: string | null;
  generateScenario: (
    typeIntervention: string,
    contraintes?: string
  ) => Promise<void>;
}

export function useScenarioGenerator(): UseScenarioGeneratorResult {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateScenario = async (
    typeIntervention: string,
    contraintes?: string
  ) => {
    setLoading(true);
    setError(null);

    const prompt = `
    Tu es un formateur en secourisme du SDIS68.
    Crée un cas pratique d'entraînement pour des pompiers intervenant sur une situation de secours à personne.
    ${
      typeIntervention
        ? `Le type d'intervention est : ${typeIntervention}.`
        : ""
    }

    ${
      contraintes
        ? `Containtes particulières a prendre en compte : ${contraintes}`
        : ""
    }

    Fournis :
    - Une description réaliste (lieu, contexte, heure, etc.)
    - Un bilan initial : conscience (AVPU), FC, FR, TA, SpO2, température.
    - Une évolution des constantes sur 3 étapes (5, 10, 15 min).
    - Un objectif pédagogique clair.

    Réponds au format JSON suivant :
    {
      "situation": "Description complète du contexte d’intervention",
      "bilan_initial": {
        "conscience": "Alerte",
        "fc": 90,
        "fr": 18,
        "ta": "120/70",
        "spo2": "97%",
        "temp": "36.8°C"
      },
      "evolution": [
        {"minute": 5, "description": "La victime commence à transpirer...", "fc": 100, "spo2": "95%"},
        {"minute": 10, "description": "La victime devient confuse...", "fc": 110, "spo2": "92%"},
        {"minute": 15, "description": "La victime perd connaissance...", "fc": 120, "spo2": "89%"}
      ],
      "objectif_pedagogique": "Reconnaître et gérer un malaise hypoglycémique"
    }
    `;

    try {
      const response = await fetch("/api/generate-scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.9,
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();

      if (!content) throw new Error("Réponse vide du modèle");

      let parsed: Scenario;

      try {
        parsed = JSON.parse(content);
      } catch {
        const match = content.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
        else throw new Error("Le format de la réponse n'est pas valide JSON");
      }

      setScenario(parsed);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.message);
      } else {
        console.error(error);
        setError("Erreur lors de la génération du scénario");
      }
    } finally {
      setLoading(false);
    }
  };

  return { scenario, loading, error, generateScenario };
}
