import React from 'react';
import oceanFish from '@/assets/ocean-fish.jpg';
import coralReef from '@/assets/coral-reef.jpg';

const OceanBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main ocean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-mid to-ocean-deep"></div>
      
      {/* Floating bubbles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-ocean-light/30 rounded-full bubble-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Floating ocean creatures */}
      <div className="absolute bottom-10 left-10 w-20 h-20 float-animation opacity-70">
        <img 
          src={oceanFish} 
          alt="Ocean fish" 
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      
      <div className="absolute top-1/4 right-20 w-16 h-16 float-animation opacity-60">
        <img 
          src={coralReef} 
          alt="Coral reef" 
          className="w-full h-full object-cover rounded-full"
          style={{ animationDelay: '1.5s' }}
        />
      </div>
      
      <div className="absolute bottom-1/3 right-10 w-12 h-12 float-animation opacity-50">
        <div className="w-full h-full bg-coral-pink rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bubble-animation opacity-40">
        <div className="w-full h-full bg-seaweed-green rounded-full"></div>
      </div>
      
      {/* Additional floating elements */}
      <div className="absolute bottom-20 right-1/3 text-4xl float-animation opacity-70">
        🐠
      </div>
      
      <div className="absolute top-1/3 left-1/3 text-3xl float-animation opacity-60" style={{ animationDelay: '2s' }}>
        🪸
      </div>
      
      <div className="absolute top-3/4 left-1/2 text-2xl bubble-animation opacity-50" style={{ animationDelay: '3s' }}>
        ⭐
      </div>
      
      <div className="absolute bottom-1/4 left-20 text-3xl float-animation opacity-40" style={{ animationDelay: '1s' }}>
        🐚
      </div>
    </div>
  );
};

export default OceanBackground;