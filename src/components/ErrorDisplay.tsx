import { Card, CardContent } from "./ui/card";

export default function ErrorDisplay({ error }: { error: string }) {
  return (
    <Card className="border-red-500/30 bg-red-900/30">
      <CardContent>
        <p className="text-red-300 text-center font-medium py-2 ">❌ {error}</p>
      </CardContent>
    </Card>
  );
}
