import { useTexture } from "@react-three/drei";
import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import * as THREE from "three";
import { useMemo } from "react";

export function ParkBackground() {
  const grassTexture = useTexture("/textures/grass.png");
  const greenLevel = useRecyclingGame((state) => state.greenLevel);
  
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(8, 8);

  const grassColor = useMemo(() => {
    const baseColor = new THREE.Color(0.4, 0.5, 0.3);
    const greenColor = new THREE.Color(0.2, 0.8, 0.3);
    return baseColor.lerp(greenColor, greenLevel / 100);
  }, [greenLevel]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          map={grassTexture} 
          color={grassColor}
        />
      </mesh>
      
      <mesh position={[0, 0, -8]}>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial 
          color={grassColor}
          opacity={0.8}
          transparent
        />
      </mesh>
    </>
  );
}
