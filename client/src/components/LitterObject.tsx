import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRecyclingGame, type LitterItem } from "@/lib/stores/useRecyclingGame";

interface LitterObjectProps {
  item: LitterItem;
}

export function LitterObject({ item }: LitterObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectItem = useRecyclingGame((state) => state.selectItem);
  const selectedItemId = useRecyclingGame((state) => state.selectedItemId);
  
  const isSelected = selectedItemId === item.id;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectItem(item.id);
  };

  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      } else {
        meshRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 2 + item.position[0]) * 0.05;
      }
    }
  });

  return (
    <group position={item.position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color={isSelected ? "#FFD700" : (hovered ? "#FFF59D" : "#FFFFFF")}
          emissive={isSelected ? "#FFD700" : "#000000"}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>
      
      <Text
        position={[0, 0, 0.31]}
        fontSize={0.4}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {item.icon}
      </Text>
      
      {(hovered || isSelected) && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {item.name}
        </Text>
      )}
    </group>
  );
}
