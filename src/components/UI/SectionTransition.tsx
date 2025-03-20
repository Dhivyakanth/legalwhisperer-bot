
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  effect?: 'fade' | 'slide' | 'zoom' | '3d-rotate' | '3d-flip' | 'law-scale' | 'gavel' | 'document-flip' | 'modal-popup';
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ 
  children, 
  className,
  delay = 0,
  effect = 'fade'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              
              // Remove transform effects based on animation type
              if (effect === 'fade' || effect === 'slide') {
                entry.target.classList.remove('translate-y-10');
              } else if (effect === 'zoom') {
                entry.target.classList.remove('scale-95');
              } else if (effect === '3d-rotate') {
                entry.target.classList.remove('rotate-x-45');
              } else if (effect === '3d-flip') {
                entry.target.classList.remove('rotate-y-90');
              } else if (effect === 'document-flip') {
                entry.target.classList.remove('rotate-y-180');
              } else if (effect === 'law-scale' || effect === 'gavel' || effect === 'modal-popup') {
                entry.target.classList.remove('scale-90');
              }
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, effect]);

  // Set initial classes based on effect type
  const getEffectClasses = () => {
    switch (effect) {
      case 'fade':
        return 'opacity-0 translate-y-10';
      case 'slide':
        return 'opacity-0 translate-y-10';
      case 'zoom':
        return 'opacity-0 scale-95';
      case '3d-rotate':
        return 'opacity-0 rotate-x-45 perspective-1000';
      case '3d-flip':
        return 'opacity-0 rotate-y-90 perspective-1000';
      case 'law-scale':
        return 'opacity-0 scale-90 perspective-1000';
      case 'gavel':
        return 'opacity-0 scale-90 perspective-1000';
      case 'document-flip':
        return 'opacity-0 rotate-y-180 perspective-2000';
      case 'modal-popup':
        return 'opacity-0 scale-90';
      default:
        return 'opacity-0 translate-y-10';
    }
  };

  // Get animation class based on effect type
  const getAnimationClass = () => {
    switch (effect) {
      case 'fade':
      case 'slide':
        return 'animate-fadeIn';
      case 'zoom':
        return 'animate-scale-in';
      case '3d-rotate':
        return 'animate-rotate3d';
      case '3d-flip':
        return 'animate-float3d';
      case 'law-scale':
        return 'animate-law-scale';
      case 'gavel':
        return 'animate-gavel-tap';
      case 'document-flip':
        return 'animate-document-flip';
      case 'modal-popup':
        return 'animate-modal-popup';
      default:
        return 'animate-fadeIn';
    }
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all duration-700 ease-out transform-gpu',
        getEffectClasses(),
        getAnimationClass(),
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
};

export default SectionTransition;
