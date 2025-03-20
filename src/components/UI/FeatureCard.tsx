
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  onClick,
  active = false,
  className,
}) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col items-center p-6 rounded-xl transition-all duration-300 cursor-pointer glass hover:shadow-lg",
        active ? "shadow-lg ring-2 ring-indigo-500/20" : "shadow",
        "opacity-0 animate-slideUp",
        className
      )}
      onClick={onClick}
      style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
    >
      <div className={cn(
        "flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300",
        active ? "animate-glow" : ""
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-center text-gray-600 dark:text-gray-300">{description}</p>
      <div className={cn(
        "absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-300",
        active ? "w-full" : "w-0"
      )}></div>
    </div>
  );
};

export default FeatureCard;
