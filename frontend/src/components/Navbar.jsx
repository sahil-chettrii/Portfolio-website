import { useEffect, useState } from 'react';
import '../style/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#home" className="navbar__logo" aria-label="Sahil Chettri, home">
        <span className="navbar__prompt">&gt;_</span>
        <span className="navbar__name">Sahil Chettri</span>
      </a>

      <a href="#contact" className="navbar__contact">
        <span className="navbar__contact-text">Contact</span>
        <span className="navbar__dot" aria-hidden="true" />
      </a>
    </header>
  );
}