import { useTexture } from "@react-three/drei";
import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import * as THREE from "three";
import { useMemo } from "react";

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
        <meshStandardMaterial color="#4a3520" />
      </mesh>
    </group>
  );
}

function Path({ position, rotation, length }: { position: [number, number, number], rotation: number, length: number }) {
  const asphaltTexture = useTexture("/textures/asphalt.png");
  asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping;
  asphaltTexture.repeat.set(length / 2, 1);
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, rotation]} position={position} receiveShadow>
      <planeGeometry args={[length, 1.5]} />
      <meshStandardMaterial map={asphaltTexture} />
    </mesh>
  );
}

export function ParkBackground() {
  const grassTexture = useTexture("/textures/grass.png");
  const greenLevel = useRecyclingGame((state) => state.greenLevel);
  
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(12, 12);

  const grassColor = useMemo(() => {
    const baseColor = new THREE.Color(0.4, 0.5, 0.3);
    const greenColor = new THREE.Color(0.3, 0.7, 0.2);
    return baseColor.lerp(greenColor, greenLevel / 100);
  }, [greenLevel]);

  const treePositions = useMemo(() => [
    [-8, 0, -6] as [number, number, number],
    [-6, 0, 6] as [number, number, number],
    [8, 0, -4] as [number, number, number],
    [7, 0, 7] as [number, number, number],
    [-9, 0, 0] as [number, number, number],
    [9, 0, 2] as [number, number, number],
    [-4, 0, -8] as [number, number, number],
    [3, 0, -7] as [number, number, number],
  ], []);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.99, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          map={grassTexture} 
          color={grassColor}
        />
      </mesh>
      
      <Path position={[0, -1.98, -5]} rotation={0} length={20} />
      <Path position={[5, -1.98, 0]} rotation={Math.PI / 2} length={15} />
      
      {treePositions.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}
    </>
  );
}
