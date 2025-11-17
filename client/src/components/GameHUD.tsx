import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import { useEffect, useState } from "react";

export function GameHUD() {
  const score = useRecyclingGame((state) => state.score);
  const timeRemaining = useRecyclingGame((state) => state.timeRemaining);
  const selectedItemId = useRecyclingGame((state) => state.selectedItemId);
  const litterItems = useRecyclingGame((state) => state.litterItems);
  const greenLevel = useRecyclingGame((state) => state.greenLevel);
  const [feedback, setFeedback] = useState<{ message: string; color: string } | null>(null);
  
  const selectedItem = selectedItemId ? litterItems.find(item => item.id === selectedItemId) : null;

  useEffect(() => {
    const unsubscribe = useRecyclingGame.subscribe(
      (state) => state.score,
      (newScore, oldScore) => {
        if (newScore > oldScore) {
          const diff = newScore - oldScore;
          setFeedback({ message: `+${diff}`, color: "#4CAF50" });
        } else if (newScore < oldScore) {
          const diff = oldScore - newScore;
          setFeedback({ message: `-${diff}`, color: "#F44336" });
        }
        
        setTimeout(() => setFeedback(null), 1000);
      }
    );
    
    return unsubscribe;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="flex flex-col items-center justify-between h-full p-4">
        <div className="w-full max-w-4xl flex justify-between items-start pointer-events-auto">
          <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg px-6 py-3">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-4xl font-bold text-green-700">{score}</div>
            {feedback && (
              <div 
                className="text-2xl font-bold absolute -top-8 left-1/2 -translate-x-1/2 animate-pulse"
                style={{ color: feedback.color }}
              >
                {feedback.message}
              </div>
            )}
          </div>
          
          <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg px-6 py-3">
            <div className="text-sm text-gray-600">Time</div>
            <div className={`text-4xl font-bold ${timeRemaining < 10 ? 'text-red-600 animate-pulse' : 'text-blue-700'}`}>
              {Math.ceil(timeRemaining)}s
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          {selectedItem && (
            <div className="bg-yellow-100/95 backdrop-blur border-2 border-yellow-400 rounded-lg shadow-lg px-6 py-3 animate-bounce">
              <div className="text-center">
                <div className="text-3xl mb-1">{selectedItem.icon}</div>
                <div className="text-lg font-bold text-gray-800">{selectedItem.name}</div>
                <div className="text-sm text-gray-600">Click the correct bin!</div>
              </div>
            </div>
          )}
          
          <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">Park Health:</div>
              <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${greenLevel}%` }}
                />
              </div>
              <div className="text-sm font-bold text-green-700">{greenLevel}%</div>
            </div>
          </div>
          
          <div className="bg-blue-50/95 backdrop-blur rounded-lg shadow-lg px-4 py-2 text-sm text-gray-700 text-center max-w-md">
            💡 <strong>Tip:</strong> Sort items quickly for bonus points!
          </div>
        </div>
      </div>
    </div>
  );
}
