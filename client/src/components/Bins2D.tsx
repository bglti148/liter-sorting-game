import { useState, useEffect } from "react";
import { useRecyclingGame, type BinType } from "@/lib/stores/useRecyclingGame";
import { useAudio } from "@/lib/stores/useAudio";

interface BinProps {
  type: BinType;
  imageSrc: string;
}

function Bin2D({ type, imageSrc }: BinProps) {
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
      className="flex-1 max-w-xs transition-all duration-200 bg-transparent border-none cursor-pointer"
      style={{
        transform: `scale(${hovered && selectedItemId ? 1.1 : 1})`,
        filter: hovered && selectedItemId ? 'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.5))' : 'none',
      }}
    >
      <img 
        src={imageSrc} 
        alt={`${type} bin`}
        className="w-full h-auto object-contain"
        style={{ maxHeight: '300px' }}
      />
    </button>
  );
}

export function Bins2D() {
  const selectedItemId = useRecyclingGame((state) => state.selectedItemId);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (selectedItemId) {
      setShowHint(true);
      const timer = setTimeout(() => {
        setShowHint(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowHint(false);
    }
  }, [selectedItemId]);

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      {showHint && selectedItemId && (
        <div className="flex justify-center mb-2 animate-pulse pointer-events-none">
          <div className="bg-yellow-400/95 backdrop-blur border-2 border-yellow-600 rounded-lg shadow-lg px-6 py-2">
            <div className="text-lg font-bold text-gray-900">👇 Click the right bin!</div>
          </div>
        </div>
      )}
      <div className="flex gap-4 p-4 justify-center pointer-events-auto items-end">
        <Bin2D type="recycling" imageSrc="/bins/recycling-bin.png" />
        <Bin2D type="compost" imageSrc="/bins/compost-bin.png" />
        <Bin2D type="trash" imageSrc="/bins/trash-bin.png" />
      </div>
    </div>
  );
}
