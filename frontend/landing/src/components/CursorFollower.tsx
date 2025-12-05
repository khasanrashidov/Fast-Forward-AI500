'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Softer spring for a "floaty" light feel
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Core "Wand Tip" Light Removed */}

      {/* Outer Glow */}
      <div className="w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,rgba(16,185,129,0)_60%)] rounded-full blur-xl" />
    </motion.div>
  );
}
