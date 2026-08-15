import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface StatsCardProps {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  suffix = '',
  label,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      className="bg-[#0C0C0C] border-2 border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 md:p-10 hover:border-[#D7E2EA]/40 transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-1">
          <span className="hero-heading font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            <AnimatedCounter value={value} suffix={suffix} duration={2} delay={delay} />
          </span>
        </div>
        <h3 className="text-[#D7E2EA] font-semibold uppercase tracking-wide text-sm sm:text-base">
          {label}
        </h3>
        <p className="text-[#D7E2EA]/60 font-light text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
