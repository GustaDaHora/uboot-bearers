import React, { memo } from 'react';

// --- Level Indicator Component ---
export const LevelIndicator: React.FC<{ level: number }> = memo(({ level }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full border-2 ${
            index < level
              ? 'border-cyan-400 bg-cyan-400 shadow-lg shadow-cyan-400/50'
              : 'border-gray-600 bg-transparent'
          } transition-all duration-300`}
        />
      ))}
      <span className="ml-2 text-sm font-bold text-cyan-400">{level}/7</span>
    </div>
  );
});
LevelIndicator.displayName = 'LevelIndicator';
