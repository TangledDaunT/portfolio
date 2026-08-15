import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import Timeline from '../components/Timeline';
import StatsCard from '../components/StatsCard';
import { portfolioStats } from '../data/stats';

const AboutSection = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 sm:py-32 md:py-40"
      style={{ background: '#0C0C0C' }}
    >
      {/* Decorative corner images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px] opacity-30"
        />
      </FadeIn>

      {/* Center content */}
      <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Bio */}
        <div className="max-w-3xl text-center">
          <FadeIn delay={0.1} y={30}>
            <div style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
              <p className="text-[#D7E2EA] font-medium text-center leading-relaxed">
                With deep expertise in AI systems and full stack development, i focus on RAG pipelines, automation, and building reliable production systems. I truly enjoy working with teams that aim to push boundaries and deliver real-world impact.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Stats Grid */}
        <div className="w-full max-w-5xl">
          <FadeIn delay={0.15} y={40}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {portfolioStats.slice(0, 6).map((stat, index) => (
                <StatsCard
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Philosophy Section */}
        <FadeIn delay={0.2} y={40}>
          <div className="bg-[#0C0C0C] border-2 border-[#D7E2EA]/20 rounded-3xl p-8 sm:p-10 md:p-12 max-w-3xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#646973] to-[#BBCCD7] rounded-2xl">
                <svg className="w-6 h-6 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#D7E2EA] font-semibold text-xl mb-2">Engineering Philosophy</h3>
                <p className="text-[#D7E2EA]/60 font-light text-sm italic">"Logic decides, language explains"</p>
              </div>
            </div>

            <div className="space-y-3 text-[#D7E2EA]/70 font-light leading-relaxed">
              <p>
                <strong className="text-[#D7E2EA] font-semibold">Reliability-first approach:</strong> Every system I build is designed for production from day one. This means proper error handling, monitoring, and graceful degradation—not optimistic assumptions.
              </p>
              <p>
                <strong className="text-[#D7E2EA] font-semibold">Pragmatic AI integration:</strong> I combine deterministic systems with LLMs where they add value, not as a default solution. Understanding when to use rules vs. models is crucial for building maintainable AI applications.
              </p>
              <p>
                <strong className="text-[#D7E2EA] font-semibold">End-to-end ownership:</strong> From hardware sensors to cloud deployments, I believe in understanding the full stack. This holistic view enables better debugging, optimization, and system design.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="w-full">
          <FadeIn delay={0.25} y={40}>
            <div className="text-center mb-8">
              <h3 className="text-[#D7E2EA] font-semibold text-2xl mb-2">My Journey</h3>
              <p className="text-[#D7E2EA]/50 font-light">Key milestones in my path as an AI Systems Engineer</p>
            </div>
          </FadeIn>
          <Timeline />
        </div>

        {/* Contact Button */}
        <FadeIn delay={0.3} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
