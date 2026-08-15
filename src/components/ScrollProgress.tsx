import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        background: 'linear-gradient(90deg, #646973 0%, #BBCCD7 100%)',
        scaleX: scrollYProgress,
      }}
    />
  );
};

export default ScrollProgress;
