import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import treasureChest from '@/assets/treasure-chest.jpg';

interface TreasureProgressProps {
  progress: number;
}

const TreasureProgress: React.FC<TreasureProgressProps> = ({ progress }) => {
  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-ocean-light/30">
      <h3 className="text-xl font-bold text-center mb-4 text-treasure-gold">
        🏴‍☠️ Treasure Discovery
      </h3>
      
      <div className="space-y-4">
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          <img 
            src={treasureChest} 
            alt="Treasure chest" 
            className="w-full h-full object-cover"
            style={{
              filter: `brightness(${0.3 + (progress / 100) * 0.7}) contrast(${0.8 + (progress / 100) * 0.4})`
            }}
          />
          {progress > 0 && (
            <div className="absolute inset-0 treasure-glow rounded-lg"></div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-2xl drop-shadow-lg">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        
        <Progress 
          value={progress} 
          className="h-3 bg-ocean-deep"
        />
        
        <p className="text-center text-sm text-muted-foreground">
          {progress < 25 && "Keep going! The treasure awaits..."}
          {progress >= 25 && progress < 50 && "Something's glowing down there!"}
          {progress >= 50 && progress < 75 && "The chest is starting to open!"}
          {progress >= 75 && progress < 100 && "Almost there! Gold coins visible!"}
          {progress >= 100 && "🎉 Treasure discovered! You're an ocean explorer!"}
        </p>
      </div>
    </Card>
  );
};

export default TreasureProgress;