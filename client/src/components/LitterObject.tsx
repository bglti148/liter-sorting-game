import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRecyclingGame, type LitterItem } from "@/lib/stores/useRecyclingGame";

interface LitterObjectProps {
  item: LitterItem;
}

export function LitterObject({ item }: LitterObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const selectItem = useRecyclingGame((state) => state.selectItem);
  const selectedItemId = useRecyclingGame((state) => state.selectedItemId);
  
  const isSelected = selectedItemId === item.id;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectItem(item.id);
  };

  useFrame((state) => {
    if (groupRef.current) {
      if (isSelected) {
        groupRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.15;
        groupRef.current.rotation.y = state.clock.elapsedTime * 2;
        groupRef.current.scale.setScalar(1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      } else {
        groupRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 2 + item.position[0]) * 0.05;
        groupRef.current.rotation.y = 0;
        groupRef.current.scale.setScalar(hovered ? 1.2 : 1);
      }
    }
  });

  return (
    <group ref={groupRef} position={item.position}>
      <mesh
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial 
          color={isSelected ? "#FFD700" : (hovered ? "#FFF59D" : "#FFFFFF")}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {item.icon}
      </Text>
      
      {(hovered || isSelected) && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="black"
        >
          {item.name}
        </Text>
      )}
    </group>
  );
}
