import { Ambulance, Info, Loader2 } from "lucide-react";
import { useState } from "react";
import ErrorDisplay from "./components/ErrorDisplay";
import ScenarioDisplay from "./components/ScenarioDisplay";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useScenarioGenerator } from "./hooks/useScenarioGenerator";
import { dump_scenario } from "./lib/utils";

function App() {
  const { scenario, loading, error, generateScenario } = useScenarioGenerator();
  const [type, setType] = useState<string>("malaise");

  const handleGenerate = () => {
    generateScenario(type);
  };

  const scenarioTest = dump_scenario;
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col items-center p-8">
      <div className="max-w-5xl w-full space-y-8">
        <header className="text-center">
          <h1 className="flex items-center justify-center gap-2 text-4xl font-bold tracking-tight text-red-500 mb-2">
            <span>
              <Ambulance />
            </span>
            Générateur d'intervention
          </h1>
          <p>Simulateur de cas de secours à personne - entraînement pompier</p>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="w-[250px]">
            <Label className="text-gray-300">Type d'intervention</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100 mt-1">
                <SelectValue placeholder="Choisir un type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectItem value="malaise">🧍‍♂️ Malaise</SelectItem>
                <SelectItem value="traumatisme">🤕 Traumatisme</SelectItem>
                <SelectItem value="inconscience">💤 Inconscience</SelectItem>
                <SelectItem value="hemorragie">🩸 Hémorragie</SelectItem>
                <SelectItem value="detresse respiratoire">
                  😮‍💨 Détresse respiratoire
                </SelectItem>
                <SelectItem value="arret cardio-respiratoire">
                  ❤️‍🔥 Arrêt cardio-respiratoire
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-lg px-6 py-5 "
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Génération en
                cours ...
              </>
            ) : (
              "🧩 Générer une intervention"
            )}
          </Button>
        </div>

        {error && <ErrorDisplay error={error} />}

        <ScenarioDisplay scenario={scenarioTest} />

        {/* {scenario && <ScenarioDisplay scenario={scenario} />} */}
      </div>
      {!scenario && (
        <Card className="bg-gray-800/60 backdrop-blur border-gray-700 mt-auto">
          <CardContent>
            <p className="text-gray-300 flex gap-2 text-sm items-center">
              <span>
                <Info size={16} />
              </span>
              Selectionné un type d'intervention et Cliquer sur Générer une
              intervention
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;
