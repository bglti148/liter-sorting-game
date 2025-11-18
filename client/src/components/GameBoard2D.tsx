import { useRecyclingGame } from "@/lib/stores/useRecyclingGame";
import { LitterObject2D } from "./LitterObject2D";
import { Bins2D } from "./Bins2D";

export function GameBoard2D() {
  const litterItems = useRecyclingGame((state) => state.litterItems);
  const greenLevel = useRecyclingGame((state) => state.greenLevel);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/textures/park-bg.png)' }}
      />
      
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{ 
          backgroundColor: 'rgba(76, 175, 80, ' + (greenLevel / 300) + ')'
        }}
      />
      
      <div className="relative w-full h-full">
        {litterItems.map((item) => (
          <LitterObject2D key={item.id} item={item} />
        ))}
        
        <Bins2D />
      </div>
    </div>
  );
}
