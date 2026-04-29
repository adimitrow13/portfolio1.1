import { useEffect, useState } from 'react'
import './App.css'

// Inline SVG Icons

/**
 * Renders the GitHub icon SVG.
 * @returns {JSX.Element} The GitHub SVG icon.
 */
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.1a5.8 5.8 0 0 0-1.6-4.1 5.7 5.7 0 0 0-.1-4s-1.3-.4-4 1.4a13.3 13.3 0 0 0-7 0C6.3 1.6 5 2 5 2a5.7 5.7 0 0 0-.1 4 5.8 5.8 0 0 0-1.6 4.1c0 5.7 3.3 6.7 6.5 7.1a4.8 4.8 0 0 0-1 3.03v4"/><path d="M9 20c-3 1-5-1-5-3"/></svg>
)

/**
 * Renders the LinkedIn icon SVG.
 * @returns {JSX.Element} The LinkedIn SVG icon.
 */
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
)

/**
 * Renders an external link icon SVG.
 * @returns {JSX.Element} The external link SVG icon.
 */
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
)

/**
 * Renders a download icon SVG.
 * @returns {JSX.Element} The download SVG icon.
 */
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
)

/**
 * Component that renders a custom cursor which follows the mouse position.
 * @returns {JSX.Element} The custom cursor component.
 */
const CustomCursor = () => {
  // Track the current X and Y coordinates of the mouse
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Add event listener for mouse movement to update coordinates
  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="custom-cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }}></div>
  );
}

/**
 * Component that creates a typewriter effect for an array of words.
 * @param {Object} props - The component props.
 * @param {string[]} props.words - The array of words to type out.
 * @returns {JSX.Element} The typewriter effect component.
 */
const Typewriter = ({ words }) => {
  // Current index of the word array
  const [index, setIndex] = useState(0);
  // Number of characters currently displayed
  const [subIndex, setSubIndex] = useState(0);
  // Flag indicating whether text is currently being deleted
  const [reverse, setReverse] = useState(false);

  // Effect responsible for the typing and deleting intervals
  useEffect(() => {
    if (index === words.length) {
      setIndex(0);
      return;
    }
    const currentWord = words[index] || '';
    if (subIndex === currentWord.length + 1 && !reverse) {
      const timeoutId = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeoutId);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  const displayWord = words[index] || '';
  return <span className="typewriter-text">{displayWord.substring(0, subIndex)}<span className="blink-cursor">|</span></span>;
};

/**
 * The main application component that renders the portfolio layout.
 * @returns {JSX.Element} The main app component.
 */
function App() {
  // State controlling the active theme ('light' or 'dark')
  const [theme, setTheme] = useState('dark')

  // Effect to apply the selected theme to the root HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Set up Intersection Observer to trigger animations when elements enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  /**
   * Toggles the application theme between dark and light modes.
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Data array for featured projects section
  const projects = [
    { 
      title: 'E-Commerce Platform', 
      desc: 'A full-stack shopping experience built with React and Node.js. Features user authentication and Stripe integration.', 
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
    },
    { 
      title: 'Task Manager', 
      desc: 'A productivity app with drag-and-drop functionality, dark mode, and local storage persistence.', 
      tags: ['Vite', 'React', 'Vanilla CSS', 'Zustand'],
      liveUrl: '#',
      githubUrl: '#'
    },
    { 
      title: 'Weather Dashboard', 
      desc: 'Real-time weather data visualization using external APIs and interactive charts.', 
      tags: ['JavaScript', 'Chart.js', 'REST API', 'CSS Grid'],
      liveUrl: '#',
      githubUrl: '#'
    },
  ]

  // Data array for the professional timeline section
  const experiences = [
    {
      role: 'Senior Frontend Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      desc: 'Led the development of a scalable React architecture serving 1M+ active users. Improved core vitals by 40%.'
    },
    {
      role: 'Web Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      desc: 'Built custom e-commerce and portfolio websites for high-profile clients using React and Node.js.'
    },
    {
      role: 'B.S. Computer Science',
      company: 'University of Technology',
      period: '2016 - 2020',
      desc: 'Graduated with honors. Specialized in human-computer interaction and web technologies.'
    }
  ]

  // Data array for categorized skills section
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['JavaScript (ES6+)', 'React', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB']
    },
    {
      title: 'Tools & Design',
      skills: ['Git & GitHub', 'Vite', 'Figma', 'UI/UX Design', 'Jest']
    }
  ]

  return (
    <div className="app">
      {/* Global custom cursor element */}
      <CustomCursor />
      
      {/* Main navigation header */}
      <nav className="navbar glass">
        <div className="container nav-content">
          <div className="logo text-gradient">Aleks.</div>
          <div className="nav-actions">
            <ul className="nav-links">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#experience" className="nav-link">Journey</a></li>
              <li><a href="#projects" className="nav-link">Work</a></li>
            </ul>
            <div className="nav-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub"><GithubIcon /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn"><LinkedinIcon /></a>
            </div>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main content wrapper */}
      <main className="container main-content">
        {/* Hero Section: Welcome message and video background */}
        <section className="hero reveal-on-scroll">
          <div className="hero-content-wrapper">
            <div className="hero-text-container">
              <h1>Hi, I'm <span className="text-gradient">Aleks</span>.</h1>
              <p className="subtitle">My names jeff</p>
              <div className="typing-container">
                <Typewriter words={['Frontend Developer.', 'UI Designer.', 'Web Architect.']} />
              </div>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View My Work</a>
                <a href="/resume.pdf" className="btn btn-secondary glass" download style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <DownloadIcon /> Resume
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="video-container">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/AfIOBLr1NDU?autoplay=1&mute=0" 
                  title="My names jeff" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </section>

        {/* About Section: Personal summary */}
        <section id="about" className="section about-section glass reveal-on-scroll">
          <div className="about-content">
            <h2 className="section-title">About Me</h2>
            <div className="about-text">
              <p>
                I am a passionate software engineer dedicated to building fast, accessible, and visually stunning web applications. With a strong foundation in modern JavaScript frameworks and a keen eye for design, I bridge the gap between aesthetics and performance.
              </p>
              <p>
                When I'm not writing code, you can find me exploring new design trends, contributing to open-source projects, or optimizing my development workflow.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section: Professional journey timeline */}
        <section id="experience" className="section reveal-on-scroll">
          <h2 className="section-title">My Journey</h2>
          <div className="timeline">
            {experiences.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass">
                  <div className="timeline-role">{exp.role}</div>
                  <div className="timeline-company">{exp.company}</div>
                  <div className="timeline-period">{exp.period}</div>
                  <p>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section: Toolset categories */}
        <section id="skills" className="section reveal-on-scroll">
          <h2 className="section-title">My Toolbox</h2>
          <div className="skills-container">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="skill-category glass">
                <h3 className="category-title text-gradient">{category.title}</h3>
                <div className="skills-grid">
                  {category.skills.map(skill => (
                    <div key={skill} className="skill-card">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section: Portfolio showcase */}
        <section id="projects" className="section reveal-on-scroll">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={i} className="project-card glass">
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                      <ExternalLinkIcon /> Live Demo
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                      <GithubIcon /> Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section: Call to action */}
        <section id="contact" className="section contact-section glass reveal-on-scroll">
          <h2 className="section-title text-gradient">Let's Connect</h2>
          <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          <a href="mailto:hello@example.com" className="btn btn-primary contact-btn">Say Hello</a>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer glass">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link"><GithubIcon /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link"><LinkedinIcon /></a>
          </div>
          <p>© {new Date().getFullYear()} Aleks. Built with React & Vite.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
