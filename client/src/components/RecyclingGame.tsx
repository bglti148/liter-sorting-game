import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GameScene } from "./GameScene";
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
          <Canvas
            camera={{
              position: [0, 2, 8],
              fov: 50,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
            }}
          >
            <Suspense fallback={null}>
              <GameScene />
            </Suspense>
          </Canvas>
          <GameHUD />
        </>
      )}
      
      {phase === 'ended' && <EndScreen />}
    </div>
  );
}
