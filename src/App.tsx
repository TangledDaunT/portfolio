import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import PlaygroundSection from './sections/PlaygroundSection';
import ScrollProgress from './components/ScrollProgress';

const App = () => {
  return (
    <main style={{ overflowX: 'clip', background: '#0C0C0C' }}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Sections */}
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <PlaygroundSection />

      {/* Footer */}
      <footer className="bg-white py-16 px-5 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-[#0C0C0C] font-black text-3xl mb-2">Shreyansh Misra</h3>
              <p className="text-[#0C0C0C]/60 font-light">AI Systems Engineer & Full Stack Developer</p>
            </div>

            <div className="flex gap-6">
              <a
                href="https://github.com/TangledDaunT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0C0C0C]/60 hover:text-[#0C0C0C] transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.547 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/shreyansh-misra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0C0C0C]/60 hover:text-[#0C0C0C] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:shreyansh@example.com"
                className="text-[#0C0C0C]/60 hover:text-[#0C0C0C] transition-colors"
                aria-label="Send email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#0C0C0C]/10 text-center">
            <p className="text-[#0C0C0C]/40 font-light text-sm">
              © {new Date().getFullYear()} Shreyansh Misra. Built with React + Vite + ❤️
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;
