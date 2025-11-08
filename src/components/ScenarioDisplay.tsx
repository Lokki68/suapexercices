import type { Scenario } from "@/types/Types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface ScenarioProps {
  scenario: Scenario;
}

export default function ScenarioDisplay({ scenario }: ScenarioProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 ">
      <Card className="bg-gray-800/60 backdrop-blur border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-red-400">🧭 Situation</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-2">
            <p className="text-gray-200 leading-relaxed">
              {scenario.situation}
            </p>
          </ScrollArea>
          <Separator className="bg-gray-700 my-4" />

          <h3 className="font-semibold text-lg text-red-300 mb-1">
            🎯 Objectif pédagogique
          </h3>
          <p className="text-gray-100">{scenario.objectif_pedagogique}</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/60 backdrop-blur border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-red-400">
            📋 Constantes & Évolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold text-gray-200 mb-2">Bilan Initial</h4>
          <pre className="bg-gray-900 text-gray-100 text-sm rounded-lg p-3 overflow-auto">
            {JSON.stringify(scenario.bilan_initial, null, 2)}
          </pre>

          <Separator className="bg-gray-700 my-4" />

          <h4 className="font-semibold text-gray-200 mb-2">Évolution</h4>
          <ScrollArea className="h-[200px] pr-2">
            <ul className="space-y-3">
              {scenario.evolution.map((step, index) => (
                <li key={index} className="border-l-4 border-red-500 pl-3">
                  <p className="text-gray-300">
                    <strong>{step.minute} min :</strong>
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
