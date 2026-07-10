'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

const nameChars = "Hi, I'm XianRui".split('');

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Tech grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--n-200) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Soft glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(108,92,231,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 30% 60%, rgba(108,92,231,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Floating particles - pure CSS */}
      <FloatingParticles />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-lg font-medium text-[var(--accent)] mb-4 tracking-wide flex items-center">
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={char === ' ' ? 'w-2' : ''}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  delay: 0.1 + nameChars.length * 0.06 + 0.3,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
                className="w-[2px] h-5 bg-[var(--accent)] ml-0.5"
              />
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-hero font-bold text-[var(--n-900)] leading-[1.25] tracking-tight"
              >
                {t('hero.title1')}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-hero font-bold text-[var(--n-900)] leading-[1.25] tracking-tight"
              >
                {t('hero.title2')}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-hero font-bold leading-[1.25] tracking-tight hero-gradient-text"
              >
                {t('hero.title3')}
              </motion.h1>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04 }}
              >
                <Link href="/knowledge">
                  <Button>{t('hero.cta1')}</Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04 }}
              >
                <Link href="/projects">
                  <Button variant="ghost">{t('hero.cta2')}</Button>
                </Link>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] flex items-center justify-center"
          >
            <AINetwork />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Pure CSS floating particles - no JS animation loop */
function FloatingParticles() {
  const particles = [
    { x: 12, y: 20, size: 3, dur: 18, delay: 0 },
    { x: 35, y: 65, size: 2, dur: 22, delay: 3 },
    { x: 58, y: 40, size: 4, dur: 16, delay: 6 },
    { x: 78, y: 75, size: 2, dur: 25, delay: 1 },
    { x: 25, y: 85, size: 3, dur: 20, delay: 8 },
    { x: 48, y: 15, size: 2, dur: 19, delay: 4 },
    { x: 65, y: 55, size: 3, dur: 23, delay: 2 },
    { x: 90, y: 30, size: 2, dur: 17, delay: 7 },
    { x: 8, y: 50, size: 4, dur: 21, delay: 5 },
    { x: 42, y: 90, size: 2, dur: 24, delay: 9 },
    { x: 72, y: 10, size: 3, dur: 18, delay: 3.5 },
    { x: 18, y: 70, size: 2, dur: 22, delay: 6.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[var(--accent)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `particleFloat ${p.dur}s linear ${p.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}

/* Pure SVG network - CSS animations only, no framer-motion on nodes */
function AINetwork() {
  const nodes = [
    { x: 250, y: 170, size: 82, label: 'AI' },
    { x: 130, y: 80, size: 58, label: 'LLM' },
    { x: 370, y: 80, size: 58, label: 'RAG' },
    { x: 80, y: 220, size: 58, label: 'Agent' },
    { x: 420, y: 220, size: 58, label: 'MCP' },
    { x: 160, y: 330, size: 58, label: 'Python' },
    { x: 340, y: 330, size: 58, label: 'Java' },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 2], [3, 5], [4, 6], [5, 6],
  ];

  return (
    <svg viewBox="0 0 500 400" className="w-full h-full">
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      
      {/* Edges - framer-motion only for initial draw, then static */}
      {edges.map(([from, to], i) => (
        <motion.line
          key={i}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="var(--n-200)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Edge pulse - pure CSS opacity */}
      {edges.map(([from, to], i) => (
        <line
          key={`pulse-${i}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="edge-pulse"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
      
      {/* Nodes - static SVG, CSS float via transform */}
      {nodes.map((node, i) => (
        <g
          key={i}
          className="node-float"
          style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${3 + i * 0.5}s` }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r={node.size / 2}
            fill="url(#nodeGradient)"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-semibold fill-[var(--n-700)]"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
