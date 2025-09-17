import React from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordCardProps {
  word: string;
  onClick: () => void;
  className?: string;
  showRemove?: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  onClick, 
  className = '', 
  showRemove = false 
}) => {
  return (
    <Card 
      className={cn(
        "relative px-4 py-2 bg-ocean-light/90 border-ocean-light text-ocean-deep font-semibold rounded-full shadow-lg transition-all duration-200 hover:shadow-xl select-none",
        className
      )}
      onClick={onClick}
    >
      <span className="text-lg">{word}</span>
      {showRemove && (
        <X 
          className="absolute -top-2 -right-2 w-5 h-5 bg-coral-pink text-white rounded-full p-1 hover:bg-coral-orange transition-colors cursor-pointer" 
        />
      )}
    </Card>
  );
};

export default WordCard;