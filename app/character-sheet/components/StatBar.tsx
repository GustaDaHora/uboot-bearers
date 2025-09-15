import React, { memo } from 'react';

// --- Componente da Barra de Status ---
interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export const StatBar: React.FC<StatBarProps> = memo(
  ({ label, value, maxValue = 10 }) => {
    const percentage = (value / maxValue) * 100;

    const getColorClass = () => {
      if (value <= 3) return 'from-red-500 to-red-600';
      if (value <= 6) return 'from-yellow-500 to-yellow-600';
      if (value <= 9) return 'from-green-500 to-green-600';
      return 'from-cyan-500 to-blue-500';
    };

    const getLabel = () => {
      if (value <= 3) return 'Baixo';
      if (value <= 6) return 'Médio';
      if (value <= 9) return 'Alto';
      return 'Excepcional';
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">{label}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-cyan-400">{value}</span>
            <span className="text-xs text-gray-500">{getLabel()}</span>
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-700">
          <div
            className={`bg-gradient-to-r ${getColorClass()} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  },
);
StatBar.displayName = 'StatBar';
