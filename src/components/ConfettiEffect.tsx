/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface ConfettiEffectProps {
  active: boolean;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  opacity: number;
}

export default function ConfettiEffect({ active, onComplete }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = [
      '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8E9E', '#AA66CC', '#10B981', '#FF9F43'
    ];
    const shapes: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Seed particles
    const particleCount = 120;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        size: 6 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: -2 + Math.random() * 4,
        speedY: 2 + Math.random() * 6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.05 + Math.random() * 0.1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
      });
    }

    let startTime = Date.now();
    const duration = 4000; // 4 seconds duration

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      particles.forEach((p) => {
        p.x += p.x < window.innerWidth / 2 ? p.speedX + 0.3 : p.speedX - 0.3;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (elapsed > duration - 1000) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'square') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'star') {
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = p.size / 2;
          const innerRadius = p.size / 4;
          let rot = (Math.PI / 2) * 3;
          let cx = 0, cy = 0;
          const step = Math.PI / spikes;

          ctx.moveTo(0, -outerRadius);
          for (let i = 0; i < spikes; i++) {
            cx = Math.cos(rot) * outerRadius;
            cy = Math.sin(rot) * outerRadius;
            ctx.lineTo(cx, cy);
            rot += step;

            cx = Math.cos(rot) * innerRadius;
            cy = Math.sin(rot) * innerRadius;
            ctx.lineTo(cx, cy);
            rot += step;
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      // Filter particles still visible and inside screen bounds
      particles = particles.filter(p => p.y < canvas.height && p.opacity > 0);

      if (elapsed < duration && particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        if (onComplete) onComplete();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      id="confetti-canvas"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
