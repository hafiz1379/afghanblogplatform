import React, { memo } from "react";
import PropTypes from "prop-types";

/**
 * Advanced LoadingSpinner with multiple animation styles
 */
const LoadingSpinner = memo(({ 
  size = 'md', 
  color = 'blue', 
  fullScreen = false, 
  label, 
  className = '',
  overlay = false,
  variant = 'spin'
}) => {
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const colorClasses = {
    blue: 'bg-blue-500 dark:bg-blue-400',
    green: 'bg-green-500 dark:bg-green-400',
    red: 'bg-red-500 dark:bg-red-400',
    purple: 'bg-purple-500 dark:bg-purple-400',
    gray: 'bg-gray-500 dark:bg-gray-400',
    white: 'bg-white',
    black: 'bg-black dark:bg-white'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex justify-center items-center z-50'
    : overlay 
      ? 'absolute inset-0 flex justify-center items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-40'
      : 'flex justify-center items-center';

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-2" aria-hidden="true">
            <div className={`animate-bounce rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
            <div className={`animate-bounce rounded-full ${sizeClasses[size]} ${colorClasses[color]} animation-delay-200`}></div>
            <div className={`animate-bounce rounded-full ${sizeClasses[size]} ${colorClasses[color]} animation-delay-400`}></div>
          </div>
        );
      case 'pulse':
        return (
          <div 
            className={`animate-pulse rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
            aria-hidden="true"
          ></div>
        );
      case 'bars':
        return (
          <div className="flex space-x-1" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`w-1 ${sizeClasses[size]} ${colorClasses[color]} animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        );
      default: // spin
        return (
          <div 
            className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-transparent border-t-current border-b-current ${colorClasses[color].replace('bg-', 'text-')}`}
            aria-hidden="true"
          ></div>
        );
    }
  };

  return (
    <div 
      className={`${containerClasses} ${className}`}
      role="status"
      aria-label={label || "Loading"}
      aria-live="polite"
    >
      <div className="flex flex-col items-center space-y-4">
        {renderSpinner()}
        {label && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 animate-pulse">
            {label}
          </span>
        )}
      </div>
    </div>
  );
});

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['blue', 'green', 'red', 'purple', 'gray', 'white', 'black']),
  fullScreen: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  overlay: PropTypes.bool,
  variant: PropTypes.oneOf(['spin', 'dots', 'pulse', 'bars'])
};

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;