import { useState } from "react";
import { useRecyclingGame, type LitterItem } from "@/lib/stores/useRecyclingGame";

interface LitterObject2DProps {
  item: LitterItem;
}

export function LitterObject2D({ item }: LitterObject2DProps) {
  const [hovered, setHovered] = useState(false);
  const selectItem = useRecyclingGame((state) => state.selectItem);
  const selectedItemId = useRecyclingGame((state) => state.selectedItemId);
  
  const isSelected = selectedItemId === item.id;

  const handleClick = () => {
    selectItem(item.id);
  };

  const leftPercent = ((item.position[0] + 6) / 12) * 100;
  const topPercent = 10 + ((item.position[2] + 3) / 6) * 60;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute transition-all duration-200"
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: `translate(-50%, -50%) scale(${isSelected ? 1.15 : hovered ? 1.1 : 1})`,
        filter: isSelected ? 'drop-shadow(0 0 12px gold)' : hovered ? 'drop-shadow(0 0 6px yellow)' : 'none',
      }}
    >
      <div className="text-6xl leading-none select-none">
        {item.icon}
      </div>
      {(hovered || isSelected) && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-white px-2 py-1 rounded bg-black/70">
          {item.name}
        </div>
      )}
    </button>
  );
}
