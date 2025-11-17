import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

export function EndScreen() {
  const restart = useRecyclingGame((state) => state.restart);
  const score = useRecyclingGame((state) => state.score);
  const correctSorts = useRecyclingGame((state) => state.correctSorts);
  const incorrectSorts = useRecyclingGame((state) => state.incorrectSorts);
  const greenLevel = useRecyclingGame((state) => state.greenLevel);

  const randomFacts = useMemo(() => {
    const facts = [
      "🌍 Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
      "🌳 Composting reduces methane emissions from landfills.",
      "♻️ Recycling plastic bottles uses 88% less energy than making new ones!",
      "🌱 Compost improves soil quality and helps plants grow stronger.",
      "📦 Recycling one ton of cardboard saves 46 gallons of oil!",
      "🥫 Americans throw away enough aluminum to rebuild our commercial air fleet every 3 months!",
      "🍎 Food waste in landfills produces methane, a greenhouse gas 25x more potent than CO2.",
      "♻️ Glass is 100% recyclable and can be recycled endlessly without loss of quality.",
    ];
    return facts.sort(() => Math.random() - 0.5).slice(0, 3);
  }, []);

  const getMessage = () => {
    if (score >= 800) return "🏆 Eco Champion!";
    if (score >= 600) return "🌟 Great Job!";
    if (score >= 400) return "👍 Good Work!";
    if (score >= 200) return "🌱 Keep Learning!";
    return "💪 Try Again!";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-green-200 to-blue-200">
      <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold text-green-700 mb-2">
            {getMessage()}
          </CardTitle>
          <CardDescription className="text-2xl text-gray-700">
            Game Over
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-5xl font-bold text-green-700 mb-2">
                {score}
              </div>
              <div className="text-lg text-gray-600">Total Score</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-700">{correctSorts}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-700">{incorrectSorts}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-700">{greenLevel}%</div>
                <div className="text-sm text-gray-600">Park Green</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg text-left">
              <div className="font-semibold text-gray-800 mb-2">💡 Did You Know?</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {randomFacts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={restart}
              size="lg"
              className="text-xl px-8 py-6 bg-green-600 hover:bg-green-700 text-white"
            >
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
