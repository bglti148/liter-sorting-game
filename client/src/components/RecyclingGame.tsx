import { useEffect, useRef } from "react";
import { GameBoard2D } from "./GameBoard2D";
import { GameHUD } from "./GameHUD";
import { StartScreen } from "./StartScreen";
import { EndScreen } from "./EndScreen";
import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";

export function RecyclingGame() {
  const phase = useRecyclingGame((state) => state.phase);
  const updateTimer = useRecyclingGame((state) => state.updateTimer);
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (phase !== 'playing') return;

    lastTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      updateTimer(delta);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [phase, updateTimer]);

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
