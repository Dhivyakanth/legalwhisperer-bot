
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  effect?: 'fade' | 'slide' | 'zoom' | '3d-rotate' | '3d-flip';
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
      default:
        return 'opacity-0 translate-y-10';
    }
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all duration-700 ease-out',
        getEffectClasses(),
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionTransition;
