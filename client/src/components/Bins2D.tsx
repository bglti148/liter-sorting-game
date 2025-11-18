import { useState } from "react";
import { useRecyclingGame, type BinType } from "@/lib/stores/useRecyclingGame";
import { useAudio } from "@/lib/stores/useAudio";

interface BinProps {
  type: BinType;
  color: string;
  label: string;
  icon: string;
}

function Bin2D({ type, color, label, icon }: BinProps) {
  const [hovered, setHovered] = useState(false);
  const sortItem = useRecyclingGame((state) => state.sortItem);
  const getSelectedItem = useRecyclingGame((state) => state.getSelectedItem);
  const selectedItemId = useRecyclingGame((state) => state.selectedItemId);
  const playSuccess = useAudio((state) => state.playSuccess);
  const playHit = useAudio((state) => state.playHit);

  const handleClick = () => {
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

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-1 max-w-xs transition-all duration-200"
      style={{
        backgroundColor: color,
        transform: `scale(${hovered && selectedItemId ? 1.05 : 1})`,
        boxShadow: hovered && selectedItemId ? `0 0 20px ${color}` : 'none',
      }}
    >
      <div className="h-48 flex flex-col items-center justify-center gap-2 text-white">
        <div className="text-5xl">{icon}</div>
        <div className="text-xl font-bold">{label}</div>
      </div>
    </button>
  );
}

export function Bins2D() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex gap-4 p-4 justify-center">
      <Bin2D type="recycling" color="#2196F3" label="Recycle" icon="♻️" />
      <Bin2D type="compost" color="#4CAF50" label="Compost" icon="🌱" />
      <Bin2D type="trash" color="#757575" label="Trash" icon="🗑️" />
    </div>
  );
}
