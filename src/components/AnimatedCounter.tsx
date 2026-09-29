import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

export const AnimatedCounter: React.FC<{
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  decimals?: number;
}> = ({ value, direction = 'up', className, decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  
  const motionValue = useMotionValue(direction === 'down' ? value + 20 : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [motionValue, inView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest);
      }
    });
  }, [springValue, decimals]);

  return <motion.span ref={ref} className={className} />;
};
