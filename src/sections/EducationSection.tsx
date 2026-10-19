import FadeIn from '../components/FadeIn';

const EducationSection = () => {
  return (
    <section id="education" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2
            className="text-[#D7E2EA] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(2rem, 8vw, 80px)' }}
          >
            Education & Certifications
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <FadeIn delay={0.1} y={30}>
            <div className="bg-[#0C0C0C] border-2 border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 h-full">
              <h3 className="text-[#D7E2EA] font-semibold text-lg mb-2">B.Tech in Computer Science</h3>
              <p className="text-[#D7E2EA]/60 font-light">University of Mumbai, 2019–2023</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <div className="bg-[#0C0C0C] border-2 border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 h-full">
              <h3 className="text-[#D7E2EA] font-semibold text-lg mb-2">AWS Certified Cloud Practitioner</h3>
              <p className="text-[#D7E2EA]/60 font-light">Amazon Web Services, 2024</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={30}>
            <div className="bg-[#0C0C0C] border-2 border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 h-full">
              <h3 className="text-[#D7E2EA] font-semibold text-lg mb-2">Deep Learning Specialization</h3>
              <p className="text-[#D7E2EA]/60 font-light">DeepLearning.AI, 2022</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
