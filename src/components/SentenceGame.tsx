import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Volume2 } from 'lucide-react';
import WordCard from './WordCard';
import GameStats from './GameStats';
import TreasureProgress from './TreasureProgress';
import OceanBackground from './OceanBackground';
import AnimatedFish from './AnimatedFish';

interface GameStats {
  score: number;
  accuracy: number;
  timeElapsed: number;
  questionsAnswered: number;
  correctAnswers: number;
}

interface Sentence {
  id: number;
  words: string[];
  correctOrder: string[];
  description: string;
}

const sentences: Sentence[] = [
  {
    id: 1,
    words: ['I', 'go', 'to', 'school'],
    correctOrder: ['I', 'go', 'to', 'school'],
    description: 'Basic sentence about going to school'
  },
  {
    id: 2,
    words: ['cat', 'The', 'is', 'sleeping'],
    correctOrder: ['The', 'cat', 'is', 'sleeping'],
    description: 'Sentence about a sleeping cat'
  },
  {
    id: 3,
    words: ['like', 'I', 'to', 'swim', 'ocean', 'the', 'in'],
    correctOrder: ['I', 'like', 'to', 'swim', 'in', 'the', 'ocean'],
    description: 'Sentence about swimming in the ocean'
  },
  {
    id: 4,
    words: ['fish', 'Many', 'coral', 'the', 'reef', 'live', 'in'],
    correctOrder: ['Many', 'fish', 'live', 'in', 'the', 'coral', 'reef'],
    description: 'Sentence about fish in coral reef'
  },
  {
    id: 5,
    words: ['treasure', 'The', 'buried', 'is', 'deep', 'underwater'],
    correctOrder: ['The', 'treasure', 'is', 'buried', 'deep', 'underwater'],
    description: 'Sentence about buried treasure'
  }
];

const SentenceGame: React.FC = () => {
  const [currentSentence, setCurrentSentence] = useState<Sentence>(sentences[0]);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    accuracy: 0,
    timeElapsed: 0,
    questionsAnswered: 0,
    correctAnswers: 0
  });
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [treasureProgress, setTreasureProgress] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setGameStats(prev => ({
        ...prev,
        timeElapsed: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Shuffle words when sentence changes
  useEffect(() => {
    setShuffledWords(shuffleArray([...currentSentence.words]));
    setUserOrder([]);
  }, [currentSentence.id]);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleWordClick = (word: string) => {
    if (!userOrder.includes(word)) {
      setUserOrder([...userOrder, word]);
    }
  };

  const handleWordRemove = (index: number) => {
    const newOrder = userOrder.filter((_, i) => i !== index);
    setUserOrder(newOrder);
  };

  const handleDragStart = (word: string) => {
    setDraggedWord(word);
  };

  const handleDragEnd = () => {
    setDraggedWord(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');
    if (word && !userOrder.includes(word)) {
      setUserOrder([...userOrder, word]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const speakSentence = (sentence: string[]) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence.join(' '));
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentSentence.correctOrder);
    
    setGameStats(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      score: isCorrect ? prev.score + 10 : prev.score,
      accuracy: Math.round(((isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers) / (prev.questionsAnswered + 1)) * 100)
    }));

    if (isCorrect) {
      setShowSuccess(true);
      setTreasureProgress(prev => Math.min(prev + 20, 100));
      
      // Speak the correct sentence
      speakSentence(currentSentence.correctOrder);
      
      toast({
        title: "🎉 Correct!",
        description: "Great job! You built the sentence correctly!",
      });
      
      setTimeout(() => {
        setShowSuccess(false);
        nextSentence();
      }, 3000);
    } else {
      setIsShaking(true);
      toast({
        title: "❌ Try Again",
        description: "That's not quite right. Try rearranging the words!",
        variant: "destructive"
      });
      
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const nextSentence = () => {
    const nextIndex = (sentences.findIndex(s => s.id === currentSentence.id) + 1) % sentences.length;
    setCurrentSentence(sentences[nextIndex]);
    // userOrder will be reset in useEffect when currentSentence changes
  };

  const resetGame = () => {
    setCurrentSentence(sentences[0]);
    setUserOrder([]);
    setShuffledWords(shuffleArray([...sentences[0].words]));
    setGameStats({
      score: 0,
      accuracy: 0,
      timeElapsed: 0,
      questionsAnswered: 0,
      correctAnswers: 0
    });
    setStartTime(Date.now());
    setTreasureProgress(0);
    setIsShaking(false);
    setShowSuccess(false);
  };

  const availableWords = shuffledWords.filter(word => !userOrder.includes(word));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanBackground />
      <AnimatedFish width={window.innerWidth} height={window.innerHeight} fishCount={12} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-lg">
            🎮 Build the Sentence
          </h1>
          <p className="text-xl text-ocean-light mb-6">
            Drag the words to build the correct sentence and discover ocean treasures!
          </p>
          <Button
            onClick={() => speakSentence(currentSentence.correctOrder)}
            variant="outline"
            className="border-ocean-light text-ocean-light hover:bg-ocean-light hover:text-ocean-deep mb-4"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Hear Target Sentence
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Words */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-ocean-light/30">
              <h3 className="text-lg font-semibold mb-4 text-center text-coral-orange">
                Available Words
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {availableWords.map((word, index) => (
                  <WordCard
                    key={`${word}-${index}`}
                    word={word}
                    onClick={() => handleWordClick(word)}
                    onDragStart={() => handleDragStart(word)}
                    onDragEnd={handleDragEnd}
                    className={`word-hover cursor-pointer ${draggedWord === word ? 'word-dragging' : ''}`}
                    isDraggable={true}
                  />
                ))}
              </div>
            </Card>

            {/* User's Sentence */}
            <Card className={`p-6 bg-card/80 backdrop-blur-sm border-ocean-light/30 ${isShaking ? 'shake-animation' : ''} ${showSuccess ? 'animate-success-bounce' : ''}`}>
              <h3 className="text-lg font-semibold mb-4 text-center text-ocean-light">
                Your Sentence
              </h3>
              <div 
                className="min-h-[80px] flex flex-wrap gap-3 justify-center items-center p-4 bg-ocean-mid/30 rounded-lg border-2 border-dashed border-ocean-light/50"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {userOrder.length === 0 ? (
                  <p className="text-muted-foreground italic">Drop words here to build your sentence...</p>
                ) : (
                  userOrder.map((word, index) => (
                    <WordCard
                      key={`${word}-${index}`}
                      word={word}
                      onClick={() => handleWordRemove(index)}
                      className="cursor-pointer animate-word-drop"
                      showRemove
                      isDraggable={false}
                    />
                  ))
                )}
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={checkAnswer}
                  disabled={userOrder.length === 0}
                  className="bg-coral-gradient hover:scale-105 transition-transform text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
                >
                  Check Answer
                </Button>
                {userOrder.length > 0 && (
                  <Button
                    onClick={() => speakSentence(userOrder)}
                    variant="outline"
                    className="border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white px-6 py-3 rounded-full"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Read My Sentence
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GameStats stats={gameStats} />
            <TreasureProgress progress={treasureProgress} />
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-ocean-light/30">
              <Button
                onClick={resetGame}
                variant="outline"
                className="w-full border-ocean-light text-ocean-light hover:bg-ocean-light hover:text-ocean-deep"
              >
                Reset Game
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceGame;