import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  rounded = 'rounded-xl',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-white/10 ${rounded} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
