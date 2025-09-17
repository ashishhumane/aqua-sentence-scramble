import React from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordCardProps {
  word: string;
  onClick: () => void;
  className?: string;
  showRemove?: boolean;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  onClick, 
  className = '', 
  showRemove = false,
  isDraggable = true,
  onDragStart,
  onDragEnd
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', word);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(e);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    onDragEnd?.(e);
  };

  return (
    <Card 
      className={cn(
        "relative px-4 py-2 bg-ocean-light/90 border-ocean-light text-ocean-deep font-semibold rounded-full shadow-lg transition-all duration-200 hover:shadow-xl select-none cursor-pointer",
        isDraggable ? "cursor-grab active:cursor-grabbing" : "",
        className
      )}
      onClick={onClick}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span className="text-lg pointer-events-none">{word}</span>
      {showRemove && (
        <X 
          className="absolute -top-2 -right-2 w-5 h-5 bg-coral-pink text-white rounded-full p-1 hover:bg-coral-orange transition-colors cursor-pointer" 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        />
      )}
    </Card>
  );
};

export default WordCard;