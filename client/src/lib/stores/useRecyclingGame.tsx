import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "ready" | "playing" | "ended";
export type BinType = "recycling" | "compost" | "trash";

export interface LitterItem {
  id: string;
  name: string;
  correctBin: BinType;
  position: [number, number, number];
  spawnTime: number;
  icon: string;
  fact: string;
}

interface RecyclingGameState {
  phase: GamePhase;
  score: number;
  timeRemaining: number;
  gameLength: number;
  selectedItemId: string | null;
  litterItems: LitterItem[];
  correctSorts: number;
  incorrectSorts: number;
  greenLevel: number;
  
  start: () => void;
  restart: () => void;
  end: () => void;
  updateTimer: (delta: number) => void;
  selectItem: (itemId: string) => void;
  sortItem: (binType: BinType) => void;
  removeItem: (itemId: string) => void;
  spawnLitter: () => void;
  addScore: (points: number) => void;
  getSelectedItem: () => LitterItem | null;
}

const litterDatabase: Array<{name: string, correctBin: BinType, icon: string, fact: string}> = [
  { name: "Plastic Bottle", correctBin: "recycling", icon: "🧴", fact: "Plastic bottles can be recycled into new bottles, clothing, and carpets!" },
  { name: "Aluminum Can", correctBin: "recycling", icon: "🥫", fact: "Aluminum cans can be recycled indefinitely without losing quality!" },
  { name: "Cardboard Box", correctBin: "recycling", icon: "📦", fact: "Recycled cardboard saves trees and uses 75% less energy to produce!" },
  { name: "Glass Bottle", correctBin: "recycling", icon: "🍾", fact: "Glass can be recycled endlessly without quality loss!" },
  { name: "Newspaper", correctBin: "recycling", icon: "📰", fact: "Recycling one ton of paper saves 17 trees!" },
  { name: "Apple", correctBin: "compost", icon: "🍎", fact: "Apple cores decompose in 2 months and create nutrient-rich soil!" },
  { name: "Banana", correctBin: "compost", icon: "🍌", fact: "Banana peels add potassium to compost, great for plants!" },
  { name: "Coffee Cup", correctBin: "compost", icon: "☕", fact: "Coffee grounds are nitrogen-rich and perfect for composting!" },
  { name: "Egg", correctBin: "compost", icon: "🥚", fact: "Eggshells add calcium to compost and help plant growth!" },
  { name: "Orange", correctBin: "compost", icon: "🍊", fact: "Orange peels break down in compost and add nutrients to soil!" },
  { name: "Plastic Bag", correctBin: "trash", icon: "🛍️", fact: "Most plastic bags can't be recycled at home - bring them to special drop-offs!" },
  { name: "Styrofoam Cup", correctBin: "trash", icon: "🥤", fact: "Styrofoam takes 500 years to decompose and is rarely recyclable!" },
  { name: "Candy", correctBin: "trash", icon: "🍬", fact: "Most candy wrappers are too small and contaminated to recycle!" },
  { name: "Tissue", correctBin: "trash", icon: "🧻", fact: "Used paper products can't be recycled due to contamination!" },
  { name: "Straw", correctBin: "trash", icon: "🥤", fact: "Plastic straws are too small to recycle and often end up in oceans!" },
];

export const useRecyclingGame = create<RecyclingGameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "ready",
    score: 0,
    timeRemaining: 60,
    gameLength: 60,
    selectedItemId: null,
    litterItems: [],
    correctSorts: 0,
    incorrectSorts: 0,
    greenLevel: 0,
    
    start: () => {
      set({
        phase: "playing",
        score: 0,
        timeRemaining: 60,
        selectedItemId: null,
        litterItems: [],
        correctSorts: 0,
        incorrectSorts: 0,
        greenLevel: 0,
      });
      
      get().spawnLitter();
      setTimeout(() => get().spawnLitter(), 100);
      setTimeout(() => get().spawnLitter(), 200);
    },
    
    restart: () => {
      set({
        phase: "ready",
        score: 0,
        timeRemaining: 60,
        selectedItemId: null,
        litterItems: [],
        correctSorts: 0,
        incorrectSorts: 0,
        greenLevel: 0,
      });
    },
    
    end: () => {
      set({ phase: "ended" });
    },
    
    updateTimer: (delta: number) => {
      const { timeRemaining, phase } = get();
      
      if (phase !== "playing") return;
      
      const newTime = Math.max(0, timeRemaining - delta);
      set({ timeRemaining: newTime });
      
      if (newTime <= 0) {
        get().end();
      }
    },
    
    selectItem: (itemId: string) => {
      set({ selectedItemId: itemId });
    },
    
    sortItem: (binType: BinType) => {
      const selectedItem = get().getSelectedItem();
      
      if (!selectedItem) return;
      
      const isCorrect = selectedItem.correctBin === binType;
      const timeSinceSpawn = Date.now() - selectedItem.spawnTime;
      const speedBonus = Math.max(0, Math.floor((5000 - timeSinceSpawn) / 100));
      const basePoints = isCorrect ? 100 : -50;
      const totalPoints = isCorrect ? basePoints + speedBonus : basePoints;
      
      if (isCorrect) {
        set((state) => ({
          correctSorts: state.correctSorts + 1,
          greenLevel: Math.min(100, state.greenLevel + 5),
        }));
      } else {
        set((state) => ({
          incorrectSorts: state.incorrectSorts + 1,
          greenLevel: Math.max(0, state.greenLevel - 3),
        }));
      }
      
      get().addScore(totalPoints);
      get().removeItem(selectedItem.id);
      set({ selectedItemId: null });
      
      setTimeout(() => {
        if (get().phase === "playing") {
          get().spawnLitter();
        }
      }, 500);
    },
    
    removeItem: (itemId: string) => {
      set((state) => ({
        litterItems: state.litterItems.filter(item => item.id !== itemId),
      }));
    },
    
    spawnLitter: () => {
      const { litterItems } = get();
      
      if (litterItems.length >= 3) return;
      
      const randomLitter = litterDatabase[Math.floor(Math.random() * litterDatabase.length)];
      
      let randomX = 0;
      let randomY = 0;
      let attempts = 0;
      let validPosition = false;
      const minDistance = 1.5;
      
      while (!validPosition && attempts < 20) {
        randomX = (Math.random() - 0.5) * 6;
        randomY = Math.random() * 2 + 1;
        
        validPosition = litterItems.every(item => {
          const dx = item.position[0] - randomX;
          const dy = item.position[1] - randomY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance >= minDistance;
        });
        
        attempts++;
      }
      
      const newItem: LitterItem = {
        id: `litter-${Date.now()}-${Math.random()}`,
        name: randomLitter.name,
        correctBin: randomLitter.correctBin,
        position: [randomX, randomY, 0],
        spawnTime: Date.now(),
        icon: randomLitter.icon,
        fact: randomLitter.fact,
      };
      
      set((state) => ({
        litterItems: [...state.litterItems, newItem],
      }));
    },
    
    addScore: (points: number) => {
      set((state) => ({
        score: Math.max(0, state.score + points),
      }));
    },
    
    getSelectedItem: () => {
      const { selectedItemId, litterItems } = get();
      if (!selectedItemId) return null;
      return litterItems.find(item => item.id === selectedItemId) || null;
    },
  }))
);
