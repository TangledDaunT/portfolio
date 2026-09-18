import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import { profileImageUrl } from '../lib/cloudinary';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.75]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ overflowX: 'clip' }}
    >
      {/* Animated SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="particleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#646973" />
            <stop offset="100%" stopColor="#BBCCD7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${15 + (i % 4) * 25}%`}
            cy={`${15 + Math.floor(i / 4) * 30}%`}
            r={3 + (i % 3)}
            fill="url(#particleGrad)"
            opacity={0.4 + (i % 3) * 0.15}
            filter="url(#glow)"
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Connecting lines */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${10 + (i % 4) * 28}%`}
            y1={`${25 + Math.floor(i / 4) * 50}%`}
            x2={`${38 + (i % 4) * 28}%`}
            y2={`${25 + Math.floor(i / 4) * 50}%`}
            stroke="url(#particleGrad)"
            strokeWidth="0.5"
            opacity={0.15}
            animate={{
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Rotating geometric shapes */}
        <motion.g
          style={{ transformOrigin: '50% 50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="50%"
            cy="50%"
            r="180"
            fill="none"
            stroke="url(#particleGrad)"
            strokeWidth="0.5"
            opacity={0.2}
            strokeDasharray="10, 20"
          />
          <circle
            cx="50%"
            cy="50%"
            r="220"
            fill="none"
            stroke="url(#particleGrad)"
            strokeWidth="0.3"
            opacity={0.15}
            strokeDasharray="5, 15"
          />
        </motion.g>

        <motion.g
          style={{ transformOrigin: '50% 50%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <svg x="0" y="0" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon
              points="50,30 70,50 50,70 30,50"
              fill="none"
              stroke="url(#particleGrad)"
              strokeWidth="0.5"
              opacity={0.1}
            />
          </svg>
        </motion.g>
      </svg>

      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <motion.nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 relative z-20" style={{ y: y1 }}>
          <a
            href="#about"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            About
          </a>
          <a
            href="#services"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Projects
          </a>
          <a
            href="#playground"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Playground
          </a>
        </motion.nav>
      </FadeIn>

      {/* Hero Content Area */}
      <motion.div className="flex-1 flex flex-col justify-between relative" style={{ y: y2 }}>
        {/* Hero Heading */}
        <FadeIn delay={0.15} y={40}>
          <div className="overflow-hidden mt-8 sm:mt-6 md:mt-0">
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-[0.9] text-center w-full relative z-10"
              style={{ fontSize: 'clamp(10vw, 10vw, 10vw)' }}
            >
              <span className="inline-block">Hi, i&apos;m </span>
              <span className="inline-block" style={{ color: '#BBCCD7' }}>shreyansh</span>
            </h1>
          </div>
        </FadeIn>

        {/* Hero Portrait - Centered */}
        <div className="flex-1 flex items-center justify-center relative">
          <FadeIn
            delay={0.6}
            y={30}
          >
            <motion.div style={{ opacity, scale }}>
              <Magnet
                padding={150}
                strength={3}
                activeTransition="transform 0.3s ease-out"
                inactiveTransition="transform 0.6s ease-in-out"
              >
                <div className="relative flex items-center justify-center">
                  {/* Rotating SVG rings around photo */}
                  <svg
                    className="absolute"
                    style={{
                      width: '320px',
                      height: '320px',
                      maxWidth: '90vw',
                      maxHeight: '90vw'
                    }}
                  >
                    <defs>
                      <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#646973" />
                        <stop offset="100%" stopColor="#BBCCD7" />
                      </linearGradient>
                    </defs>
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      fill="none"
                      stroke="url(#ringGrad1)"
                      strokeWidth="1.5"
                      opacity={0.4}
                      style={{ transformOrigin: '50% 50%' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="url(#ringGrad1)"
                      strokeWidth="1"
                      opacity={0.3}
                      strokeDasharray="8, 12"
                      style={{ transformOrigin: '50% 50%' }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>

                  {/* Photo */}
                  <img
                    src={profileImageUrl}
                    alt="Shreyansh Misra"
                    className="relative w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] object-contain pointer-events-none select-none rounded-full"
                    style={{ maxWidth: '85vw' }}
                    draggable={false}
                  />
                </div>
              </Magnet>
            </motion.div>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-6 pb-7 sm:pb-8 md:pb-10 relative z-10">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-center max-w-[360px] sm:max-w-[460px] md:max-w-[520px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              an ai systems engineer driven by building reliable and production-ready systems
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#D7E2EA]/40 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-[#D7E2EA]/40 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
