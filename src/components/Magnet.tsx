import React, { useRef, useState, useCallback, useEffect, ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const isWithinPadding =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (isWithinPadding) {
        setIsActive(true);
        ref.current.style.transform = `translate3d(${distX / strength}px, ${distY / strength}px, 0)`;
      } else {
        if (isActive) {
          setIsActive(false);
          ref.current.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    },
    [padding, strength, isActive]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    setIsActive(false);
    ref.current.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: 'transform',
        transition: isActive ? activeTransition : inactiveTransition,
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
