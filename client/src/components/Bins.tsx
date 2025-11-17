import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRecyclingGame, type BinType } from "@/lib/stores/useRecyclingGame";
import { useAudio } from "@/lib/stores/useAudio";

interface BinProps {
  type: BinType;
  position: [number, number, number];
  color: string;
  label: string;
}

function Bin({ type, position, color, label }: BinProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const sortItem = useRecyclingGame((state) => state.sortItem);
  const getSelectedItem = useRecyclingGame((state) => state.getSelectedItem);
  const selectedItemId = useRecyclingGame((state) => state.selectedItemId);
  const playSuccess = useAudio((state) => state.playSuccess);
  const playHit = useAudio((state) => state.playHit);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    
    const selectedItem = getSelectedItem();
    if (selectedItem) {
      const isCorrect = selectedItem.correctBin === type;
      
      if (isCorrect) {
        playSuccess();
      } else {
        playHit();
      }
      
      sortItem(type);
    }
  };

  useFrame(() => {
    if (meshRef.current && selectedItemId) {
      meshRef.current.scale.y = 1 + Math.sin(Date.now() * 0.005) * 0.1;
    } else if (meshRef.current) {
      meshRef.current.scale.y = 1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial 
          color={hovered && selectedItemId ? new THREE.Color(color).multiplyScalar(1.3) : color}
          emissive={hovered && selectedItemId ? color : "#000000"}
          emissiveIntensity={hovered && selectedItemId ? 0.3 : 0}
        />
      </mesh>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {label}
      </Text>
    </group>
  );
}

export function Bins() {
  return (
    <group position={[0, -1.25, 2]}>
      <Bin type="recycling" position={[-2.5, 0, 0]} color="#2196F3" label="♻️ Recycle" />
      <Bin type="compost" position={[0, 0, 0]} color="#4CAF50" label="🌱 Compost" />
      <Bin type="trash" position={[2.5, 0, 0]} color="#757575" label="🗑️ Trash" />
    </group>
  );
}
