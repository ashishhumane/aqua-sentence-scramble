import React, { useRef, useEffect } from 'react';

interface AnimatedFishProps {
  width: number;
  height: number;
  fishCount?: number;
}

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'fish1' | 'fish2' | 'fish3';
  angle: number;
}

const AnimatedFish: React.FC<AnimatedFishProps> = ({ 
  width, 
  height, 
  fishCount = 8 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishRef = useRef<Fish[]>([]);
  const animationRef = useRef<number>();

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', 
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize fish
    fishRef.current = Array.from({ length: fishCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 1,
      size: Math.random() * 20 + 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: ['fish1', 'fish2', 'fish3'][Math.floor(Math.random() * 3)] as 'fish1' | 'fish2' | 'fish3',
      angle: Math.random() * Math.PI * 2
    }));

    const drawFish = (ctx: CanvasRenderingContext2D, fish: Fish) => {
      ctx.save();
      ctx.translate(fish.x, fish.y);
      ctx.rotate(fish.angle);
      ctx.scale(fish.size / 20, fish.size / 20);

      // Fish body
      ctx.fillStyle = fish.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fish tail
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(-35, -10);
      ctx.lineTo(-35, 10);
      ctx.closePath();
      ctx.fill();

      // Fish eye
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.ellipse(8, -3, 4, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.ellipse(10, -3, 2, 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fish fins
      ctx.fillStyle = fish.color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(0, 12, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, -12, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      fishRef.current.forEach(fish => {
        // Update position
        fish.x += fish.vx;
        fish.y += fish.vy;

        // Update angle based on velocity
        fish.angle = Math.atan2(fish.vy, fish.vx);

        // Boundary checking with wraparound
        if (fish.x > width + 50) fish.x = -50;
        if (fish.x < -50) fish.x = width + 50;
        if (fish.y > height + 50) fish.y = -50;
        if (fish.y < -50) fish.y = height + 50;

        // Occasional direction change
        if (Math.random() < 0.02) {
          fish.vx += (Math.random() - 0.5) * 0.5;
          fish.vy += (Math.random() - 0.5) * 0.3;
          
          // Limit velocity
          const maxSpeed = 2;
          const speed = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);
          if (speed > maxSpeed) {
            fish.vx = (fish.vx / speed) * maxSpeed;
            fish.vy = (fish.vy / speed) * maxSpeed;
          }
        }

        drawFish(ctx, fish);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, fishCount]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none opacity-70"
      style={{ zIndex: 1 }}
    />
  );
};

export default AnimatedFish;