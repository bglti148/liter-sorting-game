import { useTexture } from "@react-three/drei";
import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import * as THREE from "three";
import { useMemo } from "react";

export function ParkBackground() {
  const parkTexture = useTexture("/textures/park-bg.png");
  const greenLevel = useRecyclingGame((state) => state.greenLevel);
  
  parkTexture.wrapS = parkTexture.wrapT = THREE.ClampToEdgeWrapping;
  parkTexture.colorSpace = THREE.SRGBColorSpace;

  const overlayColor = useMemo(() => {
    const greenTint = new THREE.Color(0.3, 0.7, 0.2);
    const opacity = greenLevel / 300;
    return { color: greenTint, opacity };
  }, [greenLevel]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial 
          map={parkTexture}
        />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.99, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial 
          color={overlayColor.color}
          transparent
          opacity={overlayColor.opacity}
        />
      </mesh>
    </>
  );
}
