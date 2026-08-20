import { ArrowUpRight, Github, Layers3, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';

type P = {
  title: string;
  year: string;
  tech: string[];
  description: string;
  detail: string;
  github: string;
  featured?: boolean;
  repo?: string;
};

export default function ProjectCard({ p, index }: { p: P; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [open, setOpen] = useState(false);

  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (py - 0.5) * -9, y: (px - 0.5) * 11 });
    setGlow({ x: px * 100, y: py * 100 });
  };

  return (
    <>
      <motion.article
        className="project-card"
        style={
          {
            transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            '--glow-x': `${glow.x}%`,
            '--glow-y': `${glow.y}%`,
          } as CSSProperties
        }
        onMouseMove={move}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setGlow({ x: 50, y: 50 });
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ delay: index * 0.07, duration: 0.65 }}
      >
        <div className="project-glow" />
        <div className="project-depth-line" />
        <div className="project-top">
          <span>0{index + 1}</span>
          <Layers3 size={19} />
        </div>
        <div className="project-body">
          <div className="project-year">{p.year}</div>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
        <div className="project-actions">
          <a href={p.github} target="_blank" rel="noreferrer">
            <Github size={17} /> GitHub <ArrowUpRight size={15} />
          </a>
          <button type="button" onClick={() => setOpen(true)}>View details</button>
        </div>
      </motion.article>

      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 35, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close project details"><X /></button>
            <span className="eyebrow">PROJECT {String(index + 1).padStart(2, '0')}</span>
            <h2>{p.title}</h2>
            <p className="modal-lead">{p.description}</p>
            <h4>What I built</h4>
            <p>{p.detail}</p>
            <h4>Stack</h4>
            <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
            <a className="primary-btn" href={p.github} target="_blank" rel="noreferrer">
              <Github size={18} /> Open repository <ArrowUpRight size={17} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
