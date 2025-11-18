import { GameBoard2D } from "./GameBoard2D";
import { GameHUD } from "./GameHUD";
import { StartScreen } from "./StartScreen";
import { EndScreen } from "./EndScreen";
import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";

export function RecyclingGame() {
  const phase = useRecyclingGame((state) => state.phase);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {phase === 'ready' && <StartScreen />}
      
      {phase === 'playing' && (
        <>
          <GameBoard2D />
          <GameHUD />
        </>
      )}
      
      {phase === 'ended' && <EndScreen />}
    </div>
  );
}
