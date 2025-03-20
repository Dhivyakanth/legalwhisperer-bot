
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BackgroundAnimation3DProps {
  className?: string;
}

const BackgroundAnimation3D: React.FC<BackgroundAnimation3DProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Call once and add event listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create connection points
    const particlesArray: Particle[] = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    const connectionDistance = 150;
    const movementSpeed = 0.5;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 2 - 1) * movementSpeed;
        this.speedY = (Math.random() * 2 - 1) * movementSpeed;
        this.color = 'rgba(100, 116, 255, 0.5)';
      }

      update() {
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create initial particles
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    };

    // Connect particles with lines if they're close enough
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            if (!ctx) return;
            ctx.strokeStyle = `rgba(100, 116, 255, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connect();
      requestAnimationFrame(animate);
    };

    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 w-full h-full pointer-events-none z-[-1]",
        "opacity-60 dark:opacity-30",
        className
      )}
    />
  );
};

export default BackgroundAnimation3D;
