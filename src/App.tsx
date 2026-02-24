import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Instagram, Youtube, ExternalLink, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [aiBio, setAiBio] = useState('');
  const [aiError, setAiError] = useState('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const generateAiBio = async () => {
    setAiError('');
    setIsGeneratingBio(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemini-2.0-flash',
          prompt:
            'Write a concise 2 sentence professional bio for Vasanth, a machine learning developer who specializes in Python, data analysis, and modern ML architectures.',
        }),
      });

      const payload = (await response.json()) as {text?: string; error?: string};
      if (!response.ok || !payload.text) {
        throw new Error(payload.error || 'Failed to generate bio');
      }

      setAiBio(payload.text.trim());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setAiError(message);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-purple-500/30 relative md:cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/50 pointer-events-none z-[100] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.2)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
      />

      {/* Noise Texture Overlay */}
      <div className="bg-noise"></div>

      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-between items-center py-8 px-8 max-w-7xl mx-auto relative z-10"
      >
        <div className="font-display text-2xl font-bold tracking-tighter">
          vasanth<span className="text-purple-500">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Home</a>
          <a href="#" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">About</a>
          <a href="#" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Projects</a>
          <a href="#" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="hover:text-white transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 max-w-4xl mx-auto relative z-10">
        
        {/* Cinematic Atmospheric Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1/4 top-1/4 w-[400px] h-[400px] bg-pink-500/10 blur-[100px] rounded-full"
          />
          
          {/* Floating Data Particles */}
          {[
            { top: '20%', left: '20%', delay: 0 },
            { top: '30%', left: '80%', delay: 2 },
            { top: '70%', left: '15%', delay: 1 },
            { top: '80%', left: '75%', delay: 3 },
            { top: '50%', left: '90%', delay: 1.5 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/50 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              style={{ top: pos.top, left: pos.left }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
            />
          ))}
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center w-full"
        >
          <motion.div variants={fadeUp} className="glass-card px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-purple-400 mb-10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            Available for new Projects
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tighter leading-tight">
            I am <span className="text-gradient">Vasanth</span>
          </motion.h1>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-display font-medium mb-8 text-gray-300 tracking-tight">
            Machine Learning Developer
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-gray-400 mb-12 text-lg font-light leading-relaxed">
            I craft intelligent, data-driven solutions that bring complex ideas to life.
            Specializing in Python, data analysis, and modern machine learning architectures.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
            <button 
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              className="bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              View My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              className="glass-card text-white hover:bg-white/10 px-10 py-4 rounded-full font-medium transition-all border border-white/10 hover:border-white/30"
            >
              Get in Touch
            </button>
            <button
              onClick={generateAiBio}
              disabled={isGeneratingBio}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="glass-card text-white hover:bg-white/10 px-10 py-4 rounded-full font-medium transition-all border border-purple-400/40 hover:border-purple-300 disabled:opacity-60"
            >
              {isGeneratingBio ? 'Generating...' : 'Generate AI Bio'}
            </button>
          </motion.div>
          {aiBio ? (
            <motion.p variants={fadeUp} className="max-w-2xl mt-6 text-sm md:text-base text-gray-300 leading-relaxed">
              {aiBio}
            </motion.p>
          ) : null}
          {aiError ? (
            <motion.p variants={fadeUp} className="mt-4 text-sm text-red-300">
              {aiError}
            </motion.p>
          ) : null}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Me */}
      <section className="py-32 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight">About Me</motion.h2>
          <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
            <motion.p variants={fadeUp}>I'm Vasanth, a 24-year-old self-taught developer based in Hyderabad. My path to engineering was unconventional—rooted in photography and graphic design before pivoting entirely to Machine Learning, Python, and data analysis. I treat this creative foundation as a distinct advantage, allowing me to visualize complex data architectures and solve analytical problems with a designer's intuition for structure and clarity.</motion.p>
            <motion.p variants={fadeUp}>When I'm not writing code, my curiosity spans across diverse disciplines. You'll find me analyzing stock market data, exploring the depths of ancient Indian history, watching dreamy cinema, or following competitive esports. Currently reading <em className="text-gray-300">The Secret History</em>, I draw parallels across these interests, cultivating a highly analytical and well-rounded mindset that informs my technical work.</motion.p>
            <motion.p variants={fadeUp}>I thrive on tackling complex problems and building intelligent, data-driven solutions. I am currently available for remote, hourly-based projects, bringing a unique synthesis of creative vision and analytical rigor to every collaboration.</motion.p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center relative"
        >
          {/* HUD / Tracking Design Animation */}
          <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 font-mono text-[10px] uppercase tracking-widest">
              <defs>
                <linearGradient id="hudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
                </linearGradient>
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <filter id="glowHUD">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Grid */}
              <g opacity="0.1" stroke="#ffffff" strokeWidth="0.5">
                {Array.from({length: 21}).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i*20} x2="400" y2={i*20} />
                ))}
                {Array.from({length: 21}).map((_, i) => (
                  <line key={`v${i}`} x1={i*20} y1="0" x2={i*20} y2="400" />
                ))}
              </g>

              {/* Center Crosshairs */}
              <g stroke="#a855f7" strokeWidth="0.5" opacity="0.6">
                <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="2 4" />
                <line x1="0" y1="200" x2="400" y2="200" strokeDasharray="2 4" />
                <circle cx="200" cy="200" r="4" fill="#fff" />
                <circle cx="200" cy="200" r="12" fill="none" stroke="#fff" />
              </g>

              {/* Rotating Rings */}
              <motion.g animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
                <circle cx="200" cy="200" r="160" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="1 6" opacity="0.5" />
                <circle cx="200" cy="200" r="140" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="40 10 5 10" opacity="0.8" />
                {/* Ring markers */}
                <path d="M 200 40 L 205 30 L 195 30 Z" fill="#a855f7" />
                <path d="M 200 360 L 205 370 L 195 370 Z" fill="#a855f7" />
              </motion.g>

              <motion.g animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
                <circle cx="200" cy="200" r="110" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                <circle cx="200" cy="200" r="90" fill="none" stroke="url(#hudGrad)" strokeWidth="1.5" strokeDasharray="100 40 20 40" />
                <circle cx="110" cy="200" r="3" fill="#fff" filter="url(#glowHUD)" />
                <circle cx="290" cy="200" r="3" fill="#fff" filter="url(#glowHUD)" />
              </motion.g>

              {/* Radar Sweep */}
              <motion.g animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
                <path d="M200 200 L200 40 A160 160 0 0 1 313.1 86.8 Z" fill="url(#radarGlow)" />
                <line x1="200" y1="200" x2="200" y2="40" stroke="#a855f7" strokeWidth="1.5" opacity="0.8" filter="url(#glowHUD)" />
              </motion.g>

              {/* Dynamic Data Graph (Bottom Left) */}
              <g transform="translate(20, 320)" opacity="0.8">
                <rect x="0" y="0" width="100" height="60" fill="#050505" stroke="#a855f7" strokeWidth="0.5" opacity="0.8" />
                <motion.polyline 
                  points="0,50 10,40 20,45 30,20 40,35 50,10 60,30 70,25 80,40 90,15 100,50" 
                  fill="none" stroke="#fff" strokeWidth="1"
                  animate={{ points: [
                    "0,50 10,40 20,45 30,20 40,35 50,10 60,30 70,25 80,40 90,15 100,50",
                    "0,50 10,30 20,55 30,10 40,45 50,20 60,40 70,15 80,30 90,25 100,50",
                    "0,50 10,40 20,45 30,20 40,35 50,10 60,30 70,25 80,40 90,15 100,50"
                  ]}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <text x="5" y="12" fill="#a855f7" fontSize="8">DATA.STREAM</text>
              </g>

              {/* Tracking Target */}
              <motion.g 
                animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }} 
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="260" y="80" width="24" height="24" fill="none" stroke="#fff" strokeWidth="0.5" />
                <line x1="255" y1="92" x2="289" y2="92" stroke="#fff" strokeWidth="0.5" />
                <line x1="272" y1="75" x2="272" y2="109" stroke="#fff" strokeWidth="0.5" />
                <circle cx="272" cy="92" r="2" fill="#a855f7" filter="url(#glowHUD)" />
                <text x="290" y="85" fill="#a855f7" fontSize="8">OBJ-7X</text>
                <text x="290" y="95" fill="#fff" fontSize="8" opacity="0.5">TRK: ACTIVE</text>
              </motion.g>

              {/* HUD Text Elements */}
              <text x="10" y="20" fill="#a855f7" filter="url(#glowHUD)">SYS.ONLINE</text>
              <text x="10" y="35" fill="#fff" opacity="0.6">COORD: 34.05 N / 118.24 W</text>
              <text x="10" y="50" fill="#fff" opacity="0.6">FREQ: 144.02 MHz</text>
              
              <text x="310" y="20" fill="#a855f7" filter="url(#glowHUD)">ITERATION_9</text>
              <text x="310" y="35" fill="#fff" opacity="0.6">V. 2.0.4.88</text>
              <text x="310" y="50" fill="#fff" opacity="0.6">STATUS: NOMINAL</text>

              {/* Progress Bars */}
              <g transform="translate(310, 350)">
                <text x="0" y="0" fill="#a855f7" fontSize="8">MEM.USAGE</text>
                <rect x="0" y="5" width="80" height="4" fill="#333" />
                <motion.rect x="0" y="5" width="60" height="4" fill="#fff" 
                  animate={{ width: [60, 75, 50, 60] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <text x="0" y="20" fill="#a855f7" fontSize="8">CPU.LOAD</text>
                <rect x="0" y="25" width="80" height="4" fill="#333" />
                <motion.rect x="0" y="25" width="40" height="4" fill="#a855f7" 
                  animate={{ width: [40, 65, 30, 40] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Infinite Marquee */}
      <div className="w-full overflow-hidden bg-purple-900/10 border-y border-purple-500/10 py-6 relative z-10 flex">
        <motion.div 
          className="flex whitespace-nowrap gap-8 items-center"
          animate={{ x: [0, -1035] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 items-center text-sm font-display font-bold tracking-widest uppercase text-purple-400/60">
              <span>Machine Learning</span>
              <span className="w-2 h-2 rounded-full bg-purple-500/30"></span>
              <span>Data Analysis</span>
              <span className="w-2 h-2 rounded-full bg-purple-500/30"></span>
              <span>Creative Coding</span>
              <span className="w-2 h-2 rounded-full bg-purple-500/30"></span>
              <span>Predictive Modeling</span>
              <span className="w-2 h-2 rounded-full bg-purple-500/30"></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skills & Technologies - Bento Grid */}
      <section className="py-32 px-8 max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-4xl md:text-5xl font-display font-bold mb-16 tracking-tight"
        >
          Technical Arsenal
        </motion.h2>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Large Card */}
          <motion.div variants={fadeUp} className="glass-card rounded-3xl p-10 md:col-span-2 flex flex-col justify-between min-h-[280px] bg-gradient-to-br from-purple-900/10 to-transparent">
            <div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-white">Machine Learning & AI</h3>
              <p className="text-gray-400 font-light mb-8 max-w-md">Building predictive models, natural language processing pipelines, and computer vision architectures.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["PyTorch", "TensorFlow", "Scikit-Learn", "NLP", "Computer Vision", "Keras"].map((tag, j) => (
                <span key={j} className="border border-purple-500/30 bg-purple-500/10 text-purple-200 px-4 py-2 rounded-full text-xs font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tall Card */}
          <motion.div variants={fadeUp} className="glass-card rounded-3xl p-10 flex flex-col justify-between min-h-[280px]">
            <div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-white">Data & Backend</h3>
              <p className="text-gray-400 font-light mb-8">Structuring and serving data efficiently.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Python", "Pandas", "SQL", "FastAPI", "PostgreSQL"].map((tag, j) => (
                <span key={j} className="border border-white/10 bg-white/5 text-gray-300 px-4 py-2 rounded-full text-xs font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Wide Bottom Card */}
          <motion.div variants={fadeUp} className="glass-card rounded-3xl p-10 md:col-span-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-display font-semibold mb-4 text-white">Design & Visualization</h3>
              <p className="text-gray-400 font-light">Translating complex datasets into intuitive, beautiful visual narratives.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Figma", "Matplotlib", "Seaborn", "D3.js", "Photoshop"].map((tag, j) => (
                <span key={j} className="border border-white/10 bg-white/5 text-gray-300 px-4 py-2 rounded-full text-xs font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience */}
      <section className="py-32 px-8 max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-4xl md:text-5xl font-display font-bold mb-20 tracking-tight"
        >
          Experience
        </motion.h2>
        <div className="relative pl-12 md:pl-16 ml-4 md:ml-8">
          {/* Gradient Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500 via-purple-500/20 to-transparent"></div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-20">
            {[
              { year: "2024", role: "Machine Learning Engineer", company: "Freelance", desc: "Developed predictive models for financial datasets and built NLP pipelines for sentiment analysis. Transitioned fully into data-driven development." },
              { year: "2022", role: "Visual Designer", company: "Creative Agency", desc: "Led brand identity and UI/UX design projects. Developed a deep understanding of visual hierarchy, which now informs my approach to data visualization." }
            ].map((exp, i) => (
              <motion.div variants={fadeUp} key={i} className="relative">
                <div className="absolute -left-[3.5rem] md:-left-[4.5rem] top-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#050505] border border-purple-500/50 text-purple-400 font-display font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  {exp.year}
                </div>
                <div className="glass-card p-10 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-display font-bold text-2xl mb-2">{exp.role}</h3>
                  <p className="text-purple-400 text-sm mb-6 font-medium tracking-wide uppercase">{exp.company}</p>
                  <p className="text-gray-400 font-light leading-relaxed text-lg">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* My Projects */}
      <section className="py-32 px-8 max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Selected Works</h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            A showcase of my recent explorations in machine learning, data analysis, and creative coding.
          </p>
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[1, 2, 3].map(i => (
            <motion.div 
              variants={fadeUp} 
              key={i} 
              className="glass-card rounded-3xl overflow-hidden flex flex-col group"
              onMouseEnter={() => setIsHovering(true)} 
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-64 bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img src={`https://picsum.photos/seed/mlproject${i}/800/600`} alt="Project" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal" />
              </div>
              <div className="p-10 flex-1 flex flex-col relative bg-[#050505]/50">
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-purple-400 transition-colors">{i === 1 ? 'Predictive Model Alpha' : i === 2 ? 'Sentiment Analyzer' : 'Trade Route Viz'}</h3>
                <p className="text-gray-400 text-sm mb-8 flex-1 font-light leading-relaxed">
                  {i === 1 ? 'An advanced machine learning model designed to analyze and predict market trends using historical financial data.' : i === 2 ? 'NLP pipeline built to scrape and analyze sentiment from thousands of financial news articles in real-time.' : 'Interactive D3.js visualization mapping ancient trade routes and their economic impact over centuries.'}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {['Python', 'TensorFlow', 'Pandas'].map((tag, j) => (
                    <span key={j} className="text-gray-500 text-xs font-medium tracking-wider uppercase">
                      {tag} {j < 2 && '•'}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-full text-sm font-medium transition-colors">
                    View Case Study
                  </button>
                  <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                    <Github size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Let's Work Together */}
      <section className="py-32 px-8 max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="glass-card rounded-3xl p-12 lg:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            {/* Info */}
            <div className="flex flex-col">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight">Let's build something <span className="text-gradient">intelligent.</span></h2>
              <p className="text-gray-400 mb-12 font-light leading-relaxed text-lg">
                I'm currently available for remote, hourly-based projects. Whether you need complex data analysis, a machine learning model, or a unique blend of design and data, I'd love to connect.
              </p>
              
              <div className="mt-auto">
                <h4 className="font-display font-semibold mb-6 text-sm tracking-widest uppercase text-gray-500">Connect</h4>
                <div className="flex flex-wrap gap-4">
                  <a href="https://github.com/vasanth" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com/in/vasanth" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://twitter.com/vasanth" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all">
                    <Twitter size={20} />
                  </a>
                  <a href="mailto:hello@vasanth.dev" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase mb-3 text-gray-500">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase mb-3 text-gray-500">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase mb-3 text-gray-500">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white resize-none"></textarea>
                </div>
                <button className="w-full bg-white text-black hover:bg-gray-200 py-4 rounded-2xl font-medium transition-colors mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 text-center border-t border-white/5 relative z-10">
        <p className="text-sm font-light tracking-widest uppercase text-gray-600">
          © {new Date().getFullYear()} Vasanth • Remote Developer
        </p>
      </footer>
    </div>
  );
}
