import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function StartScreen() {
  const start = useRecyclingGame((state) => state.start);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-green-200 to-blue-200">
      <Card className="w-full max-w-2xl mx-4 bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold text-green-700 mb-2">
            🌍 Eco Sorter 🌱
          </CardTitle>
          <CardDescription className="text-xl text-gray-700">
            Help keep our park clean and green!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-lg text-gray-800">
              <p className="mb-3">
                <strong>How to Play:</strong>
              </p>
              <ol className="text-left max-w-md mx-auto space-y-2">
                <li>1. <strong>Click</strong> on a piece of litter to pick it up</li>
                <li>2. <strong>Click</strong> the correct bin to sort it</li>
                <li>3. Sort <strong>quickly</strong> for bonus points!</li>
              </ol>
            </div>
            
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <div className="text-2xl mb-1">♻️</div>
                <div className="font-semibold">Recycle</div>
                <div className="text-xs">Bottles, cans, paper</div>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <div className="text-2xl mb-1">🌱</div>
                <div className="font-semibold">Compost</div>
                <div className="text-xs">Food scraps, peels</div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="text-2xl mb-1">🗑️</div>
                <div className="font-semibold">Trash</div>
                <div className="text-xs">Non-recyclables</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 italic">
              The more you recycle and compost correctly, the greener our park becomes! 🌳
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={start}
              size="lg"
              className="text-xl px-8 py-6 bg-green-600 hover:bg-green-700 text-white"
            >
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
