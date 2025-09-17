import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Target, Trophy, CheckCircle } from 'lucide-react';

interface GameStatsProps {
  stats: {
    score: number;
    accuracy: number;
    timeElapsed: number;
    questionsAnswered: number;
    correctAnswers: number;
  };
}

const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-ocean-light/30">
      <h3 className="text-xl font-bold text-center mb-4 text-treasure-gold">
        Game Stats
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-treasure-gold" />
            <span className="text-foreground">Score</span>
          </div>
          <span className="font-bold text-treasure-gold text-lg">
            {stats.score}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-coral-orange" />
            <span className="text-foreground">Accuracy</span>
          </div>
          <span className="font-bold text-coral-orange text-lg">
            {stats.accuracy}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-ocean-light" />
            <span className="text-foreground">Time</span>
          </div>
          <span className="font-bold text-ocean-light text-lg">
            {formatTime(stats.timeElapsed)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-seaweed-green" />
            <span className="text-foreground">Correct</span>
          </div>
          <span className="font-bold text-seaweed-green text-lg">
            {stats.correctAnswers}/{stats.questionsAnswered}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default GameStats;