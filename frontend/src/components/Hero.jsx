import { useEffect, useState } from 'react';
import '../style/Hero.css';
import Globe from './Globe';
import Particles from './Particles';
import useTyping from '../hooks/useTyping';
import useTerminal from '../hooks/useTerminal';
import prefersReducedMotion from '../hooks/prefersReducedMotion';

const NAME = 'Sahil Chettri';

const TERMINAL_LINES = [
  'INITIALIZING...',
  'LOADING PORTFOLIO...',
  'ESTABLISHING CONNECTION...',
  'SECURITY PROTOCOLS: ON',
  'READY.',
];

const TAGLINE = ['BUILD', 'BREAK', 'SECURE', 'REPEAT'];
const SIDE_RIGHT = ['Ethical Hacking', 'Cyber Security', 'Open Source', 'Technology'];
const SIDE_LEFT = ['Ideas', 'Code', 'Secure', 'Repeat'];

export default function Hero() {
  const typed = useTyping(NAME);
  const { done, current } = useTerminal(TERMINAL_LINES);
  const [active, setActive] = useState(0);

  // Highlight each tagline word in turn.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TAGLINE.length), 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Background layers */}
      <div className="hero__bg-text" aria-hidden="true">CYBER</div>
      <div className="hero__glow" aria-hidden="true" />
      <Particles />
      <Globe />
      <span className="hero__line hero__line--1" aria-hidden="true" />
      <span className="hero__line hero__line--2" aria-hidden="true" />
      <span className="hero__line hero__line--3" aria-hidden="true" />

      {/* Terminal box (left) */}
      <div className="hero__terminal" aria-hidden="true">
        {done.map((line) => (
          <p key={line}>
            <span className="hero__terminal-prompt">&gt;</span> {line}
          </p>
        ))}
        <p>
          <span className="hero__terminal-prompt">&gt;</span> {current}
          <span className="hero__blink">_</span>
        </p>
      </div>

      {/* Center content */}
      <div className="hero__content">
        <p className="hero__eyebrow">// SECURITY · SYSTEMS · CODE //</p>

        <h1 className="hero__title" aria-label={NAME}>
          <span className="hero__title-ghost" aria-hidden="true">{NAME}</span>
          <span className="hero__title-typed" aria-hidden="true">
            {typed.slice(0, 6)}
            <span className="hero__title-accent">{typed.slice(6)}</span>
            <span className="hero__cursor" />
          </span>
        </h1>

        <p className="hero__tagline" aria-label="Build, break, secure, repeat">
          {TAGLINE.map((word, i) => (
            <span key={word}>
              {i > 0 && ' · '}
              <span className={`hero__word ${i === active ? 'is-active' : ''}`}>{word}</span>
            </span>
          ))}
        </p>

        <a href="#contact" className="hero__btn">
          Contact <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* Right text */}
      <ul className="hero__side hero__side--right">
        {SIDE_RIGHT.map((t, i) => (
          <li key={t} style={{ '--i': i }}>{t}</li>
        ))}
      </ul>

      {/* Bottom-left text */}
      <ul className="hero__side hero__side--left">
        {SIDE_LEFT.map((t, i) => (
          <li key={t} style={{ '--i': i }}>{t}</li>
        ))}
      </ul>

      {/* Scroll indicator */}
      <a href="#about" className="hero__scroll">
        <span>SCROLL</span>
        <i className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}