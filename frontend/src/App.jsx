import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import './style/Animations.css';
import './style/Theme.css'; // keep LAST

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
}