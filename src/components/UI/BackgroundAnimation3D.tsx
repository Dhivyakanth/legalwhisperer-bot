
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
    const particleCount = Math.min(40, Math.floor(window.innerWidth / 35));
    const connectionDistance = 170;
    const movementSpeed = 0.4;

    // Law-themed shapes and symbols
    const legalSymbols = [
      { draw: drawScales, size: 20 },
      { draw: drawGavel, size: 15 },
      { draw: drawParagraph, size: 12 }
    ];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      symbolIndex: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 2 - 1) * movementSpeed;
        this.speedY = (Math.random() * 2 - 1) * movementSpeed;
        this.color = 'rgba(64, 81, 137, 0.6)'; // Blue-ish legal color
        this.symbolIndex = Math.floor(Math.random() * legalSymbols.length);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.02 - 0.01);
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
        this.rotation += this.rotationSpeed;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const symbol = legalSymbols[this.symbolIndex];
        const scale = this.size / 2;
        ctx.scale(scale, scale);
        
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5 / scale;
        
        symbol.draw(ctx, 0, 0, symbol.size);
        
        ctx.restore();
      }
    }

    // Draw scales of justice
    function drawScales(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      // Base
      ctx.beginPath();
      ctx.moveTo(x - size/2, y + size/2);
      ctx.lineTo(x + size/2, y + size/2);
      ctx.lineTo(x + size/3, y);
      ctx.lineTo(x - size/3, y);
      ctx.closePath();
      ctx.stroke();
      
      // Bar
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - size/1.5);
      ctx.stroke();
      
      // Top bar
      ctx.beginPath();
      ctx.moveTo(x - size/1.5, y - size/1.5);
      ctx.lineTo(x + size/1.5, y - size/1.5);
      ctx.stroke();
      
      // Scales
      ctx.beginPath();
      ctx.arc(x - size/1.5, y - size/1.2, size/5, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x + size/1.5, y - size/1.2, size/5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw gavel
    function drawGavel(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      // Gavel head
      ctx.beginPath();
      ctx.roundRect(x - size/2, y - size/2, size, size/2, [size/8]);
      ctx.stroke();
      
      // Handle
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size/1.2, y + size/1.2);
      ctx.stroke();
    }

    // Draw paragraph symbol
    function drawParagraph(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.beginPath();
      ctx.moveTo(x, y - size/2);
      ctx.lineTo(x, y + size/2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x + size/4, y - size/4, size/4, Math.PI, 0, false);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x + size/4, y + size/4, size/4, Math.PI, 0, false);
      ctx.stroke();
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
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(64, 81, 137, ${opacity * 0.5})`;
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
        "opacity-40 dark:opacity-25",
        className
      )}
    />
  );
};

export default BackgroundAnimation3D;
