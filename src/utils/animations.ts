
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'zoomIn'
  | 'slideInLeft'
  | 'slideInRight'
  | 'bounce'
  | 'pulse';

interface AnimationProps {
  variant: AnimationVariant;
  duration?: number;
  delay?: number;
  className?: string;
}

export const getAnimationClasses = ({
  variant,
  duration = 500,
  delay = 0,
  className = '',
}: AnimationProps): string => {
  const baseStyles = 'opacity-0';
  const animationStyles: Record<AnimationVariant, string> = {
    fadeIn: 'animate-fadeIn',
    fadeInUp: 'animate-slideUp',
    fadeInDown: 'translate-y-[-20px] animate-fadeIn',
    zoomIn: 'scale-95 animate-scale-in',
    slideInLeft: 'translate-x-[-20px] animate-fadeIn',
    slideInRight: 'translate-x-[20px] animate-fadeIn',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
  };

  const styles = cn(
    baseStyles,
    animationStyles[variant],
    className
  );

  return styles;
};

export const staggeredContainerClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

export const staggeredChildClasses = (index: number, baseDelay: number = 100) => {
  const delay = baseDelay * index;
  return `opacity-0 animate-fadeIn` + (delay ? ` [animation-delay:${delay}ms]` : '');
};
