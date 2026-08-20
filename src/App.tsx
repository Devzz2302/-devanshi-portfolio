import { ArrowDown, ArrowUpRight, Github, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import { BackgroundScene, LaptopScene } from './components/Scene';
import ProjectCard from './components/ProjectCard';
import { experience, featuredProjects, profile, skills } from './data/portfolio';
import { useEffect, useState } from 'react';
import profileImg from './assets/profile-cutout.webp';

type Repo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; updated_at: string };

function Portrait() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 });
  const y = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 120, damping: 18 });

  return (
    <motion.div
      className="portrait-wrap"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.9, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.15 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width * 2 - 1);
        my.set((e.clientY - r.top) / r.height * 2 - 1);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <div className="portrait-backplate" />
      <div className="portrait-orbit orbit-a" />
      <div className="portrait-orbit orbit-b" />
      <div className="portrait-orbit orbit-c" />
      <div className="portrait-grid" />
      <div className="portrait-card">
        <div className="portrait-glow" />
        <div className="portrait-image-frame">
          <img src={profileImg} alt="Devanshi Pandey" />
        </div>
        <div className="portrait-edge-label">DATA / AI / BUILD</div>
        <div className="portrait-tag"><span>AVAILABLE FOR</span><strong>OPPORTUNITIES</strong></div>
        <div className="portrait-number">DP<span>01</span></div>
      </div>
    </motion.div>
  );
}

function App() {
  const reduce = useReducedMotion();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Devzz2302/repos?per_page=100&sort=updated')
      .then((r) => r.ok ? r.json() : [])
      .then((d) => setRepos(Array.isArray(d) ? d : []))
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, []);

  const featuredNames = new Set(featuredProjects.map((p) => p.github.split('/').pop()));
  const extra = repos.filter((r) => !featuredNames.has(r.name)).slice(0, 7);

  return (
    <div id="top" className="app">
      <Navbar />
      <section className="hero">
        <BackgroundScene />
        <div className="hero-wash" />
        <div className="hero-noise" />
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">HELLO, I'M</span>
            <h1>Devanshi<br /><em>Pandey</em></h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-copy">{profile.summary}</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#projects">Explore my work <ArrowDown size={17} /></a>
              <a className="ghost-btn" href={'mailto:' + profile.email}>Let's connect <ArrowUpRight size={17} /></a>
            </div>
            <div className="hero-meta"><span><Sparkles size={14} /> AI / Data / Analytics</span><span><MapPin size={14} /> India</span></div>
          </motion.div>
        </div>
        <Portrait />
        <div className="hero-side-note">COMPUTER SCIENCE / DATA / PRODUCT</div>
        <a className="scroll-cue" href="#about">SCROLL TO EXPLORE <ArrowDown size={14} /></a>
      </section>

      <section id="about" className="section about">
        <div className="section-head"><span className="eyebrow">01 / ABOUT</span><h2>Data-driven thinking.<br /><span>Builder's curiosity.</span></h2></div>
        <div className="about-grid"><div className="about-copy"><p className="big-copy">I like working where <b>data, people, and technology</b> meet — turning messy inputs into systems, dashboards, and products that are actually useful.</p><p>As a Computer Science undergraduate at Bennett University, my work spans analytics, ETL, Power BI, SQL, machine learning, frontend engineering, and program operations.</p><div className="stat-row"><div><strong>3+</strong><span>Featured projects</span></div><div><strong>10</strong><span>Public GitHub repos</span></div><div><strong>7.91</strong><span>Current CGPA</span></div></div></div><div className="about-orb"><div className="orb-ring r1" /><div className="orb-ring r2" /><div className="orb-ring r3" /><div className="orb-core">DP</div></div></div>
      </section>

      <section id="projects" className="section projects">
        <div className="section-head split"><div><span className="eyebrow">02 / PROJECTS</span><h2>Things I've<br /><span>built.</span></h2></div><p>Selected work across computer vision, retrieval, NLP, and interactive software. Every project links directly to its public repository.</p></div>
        <div className="project-grid">{featuredProjects.map((p, i) => <ProjectCard p={p} index={i} key={p.title} />)}</div>
        {extra.length > 0 && <><div className="repo-head"><span className="eyebrow">MORE FROM GITHUB</span><span>{loading ? 'Syncing repositories…' : `${repos.length} public repositories found`}</span></div><div className="repo-grid">{extra.map((r) => <a className="repo-card" href={r.html_url} target="_blank" rel="noreferrer" key={r.name}><div><span className="repo-lang">{r.language || 'Repository'}</span><h3>{r.name.replaceAll('-', ' ')}</h3><p>{r.description || 'A project from Devanshi’s public GitHub workspace.'}</p></div><ArrowUpRight /></a>)}</div></>}
      </section>

      <section id="experience" className="section experience"><div className="section-head"><span className="eyebrow">03 / EXPERIENCE</span><h2>Where I've<br /><span>made impact.</span></h2></div><div className="timeline">{experience.map((e, i) => <motion.article className="timeline-item" key={e.company + e.role} initial={{ opacity: 0, x: i % 2 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .25 }}><div className="timeline-dot" /><div className="timeline-date">{e.period}</div><div className="timeline-card"><span>{e.company}</span><h3>{e.role}</h3>{e.bullets.map((b) => <p key={b}>{b}</p>)}</div></motion.article>)}</div></section>

      <section id="skills" className="section skills"><div className="section-head split"><div><span className="eyebrow">04 / TOOLKIT</span><h2>Tools I<br /><span>think with.</span></h2></div><p>Practical technologies I use to analyse, build, visualize, automate, and ship.</p></div><div className="skills-layout"><div className="skill-list">{Object.entries(skills).map(([group, items]) => <div className="skill-group" key={group}><span>{group}</span><div>{items.map((s) => <motion.b whileHover={reduce ? undefined : { y: -4, scale: 1.04, rotateX: 8, rotateY: -6 }} key={s}>{s}</motion.b>)}</div></div>)}</div><LaptopScene /></div></section>

      <section id="profiles" className="section profiles"><div className="profile-panel"><span className="eyebrow">05 / TECH PROFILES</span><h2>Find me<br /><span>online.</span></h2><p>Want to see the code, connect professionally, or simply say hello? Everything is one click away.</p><div className="profile-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github /><div><b>GitHub</b><span>@Devzz2302</span></div><ArrowUpRight /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><span className="linkedin-mark">in</span><div><b>LinkedIn</b><span>Devanshi Pandey</span></div><ArrowUpRight /></a><a href={'mailto:' + profile.email}><Mail /><div><b>Email</b><span>{profile.email}</span></div><ArrowUpRight /></a><a href={'tel:' + profile.phone.replace(/\s/g, '')}><Phone /><div><b>Phone</b><span>{profile.phone}</span></div><ArrowUpRight /></a></div></div></section>

      <section id="contact" className="section contact"><div className="contact-inner"><div><span className="eyebrow">06 / CONTACT</span><h2>Let's make<br /><span>something useful.</span></h2><p>Open to conversations around analytics, software, AI, internships, and interesting problems.</p></div><div className="contact-card"><a className="mail-big" href={'mailto:' + profile.email}>{profile.email}<ArrowUpRight /></a><div className="contact-line"><span>Phone</span><a href={'tel:' + profile.phone.replace(/\s/g, '')}>{profile.phone}</a></div><div className="contact-line"><span>LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noreferrer">Connect <ArrowUpRight size={15} /></a></div><a className="primary-btn" href={'mailto:' + profile.email}>Start a conversation <Mail size={17} /></a></div></div></section>
      <footer><span>© {new Date().getFullYear()} Devanshi Pandey</span><span>Designed & built with curiosity.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}

export default App;
