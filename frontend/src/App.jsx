import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import './style/Animations.css'; // keep this LAST so it overrides the base styles

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
}