/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback } from 'react';

interface CelestialElement {
  id: number;
  type: 'sun' | 'moon' | 'star' | 'cloud' | 'sparkle';
  x: number;       // horizontal percentage (0 to 100)
  y: number;       // vertical percentage (0 to 100)
  size: number;    // size scale multiplier
  speedY: number;  // drifting speed vertically
  speedX: number;  // drifting speed horizontally
  opacity: number;
  rotation: number;
  rotSpeed: number;
}

interface SunMoonBackgroundProps {
  themeMode: 'day' | 'night';
}

export default function SunMoonBackground({ themeMode }: SunMoonBackgroundProps) {
  const [elements, setElements] = useState<CelestialElement[]>([]);

  // Initialize a set of drifting celestial bodies
  useEffect(() => {
    const initialCount = 15;
    const initialElements: CelestialElement[] = [];

    for (let i = 0; i < initialCount; i++) {
      const isSunOrMoon = Math.random() > 0.7;
      let type: 'sun' | 'moon' | 'star' | 'cloud' | 'sparkle' = 'star';

      if (themeMode === 'day') {
        type = isSunOrMoon ? 'sun' : (Math.random() > 0.5 ? 'cloud' : 'sparkle');
      } else {
        type = isSunOrMoon ? 'moon' : (Math.random() > 0.4 ? 'star' : 'sparkle');
      }

      initialElements.push({
        id: Math.random() + i,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.6 + Math.random() * 0.8, // size scaling
        speedY: -(0.02 + Math.random() * 0.05), // drift upwards
        speedX: (Math.random() - 0.5) * 0.04,  // gentle side sway
        opacity: 0.15 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    setElements(initialElements);
  }, [themeMode]);

  // Handle periodic drift and regeneration
  useEffect(() => {
    const handleFrame = setInterval(() => {
      setElements((prev) =>
        prev
          .map((el) => {
            let nextY = el.y + el.speedY;
            let nextX = el.x + el.speedX;
            let nextOpacity = el.opacity;

            // Wrap around the top/bottom/sides or slightly fade out
            if (nextY < -10) {
              nextY = 110;
              nextX = Math.random() * 100;
              nextOpacity = 0.15 + Math.random() * 0.4;
            }

            if (nextX < -10) nextX = 110;
            if (nextX > 110) nextX = -10;

            return {
              ...el,
              x: nextX,
              y: nextY,
              opacity: nextOpacity,
              rotation: el.rotation + el.rotSpeed,
            };
          })
      );
    }, 50);

    return () => clearInterval(handleFrame);
  }, []);

  // Spawn an interactive element on document tap/click for kid delight!
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Prevent spawning inside interactive areas (buttons, dialogs, cards)
      const target = e.target as HTMLElement;
      if (
        target.closest('button') || 
        target.closest('select') || 
        target.closest('input') || 
        target.closest('a') || 
        target.closest('[role="dialog"]')
      ) {
        return;
      }

      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;

      const newElement: CelestialElement = {
        id: Date.now(),
        type: themeMode === 'day' ? 'sun' : 'moon',
        x: xPercent,
        y: yPercent,
        size: 1.2 + Math.random() * 0.6, // Larger interactive elements
        speedY: -(0.1 + Math.random() * 0.1), // Float up faster
        speedX: (Math.random() - 0.5) * 0.1,
        opacity: 0.8,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
      };

      setElements((prev) => [...prev, newElement]);

      // Prune after a few seconds
      setTimeout(() => {
        setElements((prev) => prev.filter((el) => el.id !== newElement.id));
      }, 4000);
    };

    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, [themeMode]);

  const renderSVG = (type: string) => {
    switch (type) {
      case 'sun':
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-amber-400/30 dark:text-amber-300/20 fill-current drop-shadow-md">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'moon':
        return (
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-200/40 dark:text-yellow-100/30 fill-current drop-shadow">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        );
      case 'cloud':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-12 text-white/40 dark:text-slate-600/20 fill-current">
            <path d="M18 10a5 5 0 0 0-9.53-1.8A4 4 0 0 0 4 12a4 4 0 0 0 4 4h10a5 5 0 0 0 0-10z" />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-300/40 dark:text-amber-200/30 fill-current">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        );
      case 'sparkle':
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-300/30 dark:text-teal-200/20 fill-current">
            <path d="M12 3l1.912 5.813h6.111l-4.943 3.591 1.888 5.813-4.968-3.611-4.968 3.611 1.888-5.813-4.943-3.591h6.111z" />
          </svg>
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: `scale(${el.size}) rotate(${el.rotation}deg)`,
            opacity: el.opacity,
          }}
        >
          {renderSVG(el.type)}
        </div>
      ))}
    </div>
  );
}
