import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { projects as allProjects, Project, categoryColors } from '../data/projects';
import ProjectFilter from '../components/ProjectFilter';
import LiveProjectButton from '../components/LiveProjectButton';

interface ProjectCardProps {
  project: Project;
  index: number;
  variant: 'large' | 'medium' | 'compact';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, variant }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'large') {
    return (
      <motion.div
        className="rounded-[40px] sm:rounded-[50px] border-2 border-[#D7E2EA] bg-[#0C0C0C] overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div
                className="text-sm font-medium mb-2 px-3 py-1 rounded-full inline-block"
                style={{ backgroundColor: `${categoryColors[project.category]}20`, color: categoryColors[project.category] }}
              >
                {project.category}
              </div>
              <h3 className="text-[#D7E2EA] font-bold text-2xl sm:text-3xl">{project.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {project.liveUrl && <LiveProjectButton href={project.liveUrl} />}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-[#D7E2EA] rounded-full hover:bg-[#D7E2EA]/10 transition-colors"
                aria-label={`View ${project.name} on GitHub`}
              >
                <svg className="w-5 h-5 text-[#D7E2EA]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.547 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#D7E2EA]/70 font-light leading-relaxed mb-4">
            {project.longDescription || project.description}
          </p>

          {/* Highlights */}
          {project.highlights && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1 bg-[#D7E2EA]/10 text-[#D7E2EA] rounded-full text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 border border-[#D7E2EA]/30 text-[#D7E2EA]/70 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Stats */}
          {project.stars > 0 && (
            <div className="flex items-center gap-2 mt-4 text-sm text-[#D7E2EA]/60">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{project.stars} stars</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  if (variant === 'medium') {
    return (
      <motion.div
        className="rounded-2xl border-2 border-[#D7E2EA]/20 bg-[#0C0C0C] p-6 hover:border-[#D7E2EA]/40 transition-all"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ scale: 1.02, borderColor: 'rgba(215, 226, 234, 0.4)' }}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-[#D7E2EA] font-semibold text-lg">{project.name}</h3>
          <div className="flex gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
              aria-label={`View ${project.name} on GitHub`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.547 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-[#D7E2EA]/60 font-light text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.highlights.slice(0, 3).map((h) => (
              <span key={h} className="px-2 py-0.5 bg-[#D7E2EA]/10 text-[#D7E2EA]/70 rounded text-xs">
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 border border-[#D7E2EA]/20 text-[#D7E2EA]/60 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    );
  }

  // Compact variant
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-[#0C0C0C] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-[#D7E2EA] font-medium text-sm mb-1">{project.name}</h4>
          <p className="text-[#D7E2EA]/40 text-xs">{project.description || 'No description'}</p>
        </div>
        <div className="text-[#D7E2EA]/30 ml-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
};

const ProjectsSection = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects);

  // Separate projects by tier
  const featuredProjects = filteredProjects.filter(p => Boolean(p.liveUrl));
  const iotProjects = filteredProjects.filter(p => p.category === 'iot');
  const automationProjects = filteredProjects.filter(p => p.category === 'automation');
  const experimentProjects = filteredProjects.filter(p => p.category === 'experiment' && !p.liveUrl);
  const coursework = filteredProjects.filter(p => p.category === 'coursework');
  const newGithubProjects = filteredProjects.filter(p => p.isNew);

  return (
    <section className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Projects
          </h2>
        </FadeIn>

        {/* Filter */}
        <FadeIn delay={0.1} y={30}>
          <div className="mb-12">
            <ProjectFilter projects={allProjects} onSelect={setFilteredProjects} />
          </div>
        </FadeIn>

        {/* Results count */}
        {filteredProjects.length !== allProjects.length && (
          <div className="text-center mb-8 text-[#D7E2EA]/60 font-light">
            Showing {filteredProjects.length} of {allProjects.length} projects
          </div>
        )}

        {/* Featured Projects - Large Cards */}
        {featuredProjects.length > 0 && (
          <div className="space-y-6 mb-16">
            <FadeIn delay={0.1} y={20}>
              <div className="text-center">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-sm">Deployed Projects</span>
              </div>
            </FadeIn>
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} variant="large" />
            ))}
          </div>
        )}

        {/* IoT Projects - Medium Cards */}
        {iotProjects.length > 0 && (
          <div className="mb-16">
            <FadeIn delay={0.15} y={20}>
              <div className="text-center mb-6">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-sm">IoT & Hardware</span>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {iotProjects.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} variant="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Automation Projects - Medium Cards */}
        {automationProjects.length > 0 && (
          <div className="mb-16">
            <FadeIn delay={0.2} y={20}>
              <div className="text-center mb-6">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-sm">AI & Automation</span>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {automationProjects.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} variant="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Experiment Projects */}
        {experimentProjects.length > 0 && (
          <div className="mb-16">
            <FadeIn delay={0.25} y={20}>
              <div className="text-center mb-6">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-sm">Experiments & Tools</span>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {experimentProjects.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} variant="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Coursework - Compact List */}
        {coursework.length > 0 && (
          <div>
            <FadeIn delay={0.3} y={20}>
              <div className="text-center mb-6">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-sm">Coursework & Learning</span>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coursework.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {newGithubProjects.length > 0 && (
          <div className="mb-16">
            <FadeIn delay={0.35} y={20}>
              <div className="text-center mb-6">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-sm">New GitHub Projects</span>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newGithubProjects.map((project, i) => (
                <ProjectCard key={`new-${project.name}`} project={project} index={i} variant="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-[#D7E2EA]/40 font-light">No projects match your filters</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
