import FadeIn from '../components/FadeIn';

const services = [
  {
    number: '01',
    name: 'AI Systems',
    description:
      'Building production RAG pipelines, vector search workflows, and deterministic evaluation loops for reliable, real-world AI applications.',
  },
  {
    number: '02',
    name: 'Full Stack',
    description:
      'End-to-end systems with fast iteration, clean APIs, and polished user experiences — from React frontends to FastAPI backends.',
  },
  {
    number: '03',
    name: 'Automation & IoT',
    description:
      'Real-time sensor systems, ESP32 device control, and dependable hardware-software automation flows for smart environments.',
  },
  {
    number: '04',
    name: 'LLM Architecture',
    description:
      'Designing multi-agent workflows, prompt pipelines, and orchestration layers using LangChain, LangGraph, and custom tooling.',
  },
  {
    number: '05',
    name: 'Web Development',
    description:
      'Modern, performant web applications built with React, Next.js, TypeScript, and Tailwind — shipped fast and built to last.',
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((s, i) => (
          <FadeIn key={s.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom:
                  i < services.length - 1
                    ? '1px solid rgba(12, 12, 12, 0.15)'
                    : 'none',
              }}
            >
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {s.number}
              </span>
              <div className="flex flex-col justify-center gap-2 pt-2 sm:pt-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {s.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
