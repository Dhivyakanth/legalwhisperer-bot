
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'zoomIn'
  | 'slideInLeft'
  | 'slideInRight'
  | 'bounce'
  | 'pulse'
  | 'rotate3d'
  | 'float3d';

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
    rotate3d: 'animate-rotate3d',
    float3d: 'animate-float3d',
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

// 3D animation classes
export const perspective3dClasses = "perspective-1000";
export const transform3dClasses = "transform-3d";
export const rotate3dClasses = "rotate3d";

// Theme transition classes
export const themeTransitionClasses = "transition-colors duration-300";

