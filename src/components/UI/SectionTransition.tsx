
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('translate-y-10');
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
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all duration-700 ease-out opacity-0 translate-y-10',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionTransition;
