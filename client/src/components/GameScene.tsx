import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import { LitterObject } from "./LitterObject";
import { Bins } from "./Bins";
import { ParkBackground } from "./ParkBackground";
import { useAudio } from "@/lib/stores/useAudio";

export function GameScene() {
  const updateTimer = useRecyclingGame((state) => state.updateTimer);
  const phase = useRecyclingGame((state) => state.phase);
  const litterItems = useRecyclingGame((state) => state.litterItems);
  const spawnLitter = useRecyclingGame((state) => state.spawnLitter);
  const lastSpawnTime = useRef(-10);

  useFrame((state, delta) => {
    if (phase === "playing") {
      updateTimer(delta);
      
      const currentTime = state.clock.getElapsedTime();
      if (currentTime - lastSpawnTime.current > 3 && litterItems.length < 3) {
        spawnLitter();
        lastSpawnTime.current = currentTime;
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#87CEEB"]} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      
      <ParkBackground />
      <Bins />
      
      {litterItems.map((item) => (
        <LitterObject key={item.id} item={item} />
      ))}
    </>
  );
}
