
import React from 'react';

const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 animate-gradient"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '6s' }}></div>
      </div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
    </div>
  );
};

export default BackgroundEffect;
