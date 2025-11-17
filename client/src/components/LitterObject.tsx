import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
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
        groupRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05;
        groupRef.current.scale.setScalar(1.15);
      } else {
        groupRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 2 + item.position[0]) * 0.03;
        groupRef.current.scale.setScalar(hovered ? 1.1 : 1);
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
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          transparent
          opacity={0}
        />
      </mesh>
      <Html
        center
        position={[0, 0, 0.01]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div style={{
          fontSize: '48px',
          lineHeight: '48px',
          textAlign: 'center',
          filter: isSelected ? 'drop-shadow(0 0 8px gold)' : hovered ? 'drop-shadow(0 0 4px yellow)' : 'none',
        }}>
          {item.icon}
        </div>
      </Html>
      
      {(hovered || isSelected) && (
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.15}
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
