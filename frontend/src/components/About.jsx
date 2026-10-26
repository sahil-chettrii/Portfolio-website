import '../style/About.css';
import Reveal from './Reveal';
import ScrambleText from './ScrambleText';

const profile = [
  { key: 'name', value: 'Sahil Chettri' },
  { key: 'role', value: 'Full Stack Developer' },
  { key: 'focus', value: 'Cyber Security, Ethical Hacking' },
  { key: 'stack', value: 'React, Node.js, Express' },
  { key: 'status', value: 'Open to work' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        <h2 className="about__heading">
          <span className="about__heading-prefix">//</span>
          <ScrambleText text="About me" />
        </h2>

        <div className="about__grid">
          <Reveal className="about__text">
            <p>
              I'm Sahil Chettri, a developer who builds web applications and then tries
              to break them. Knowing how an attacker thinks makes me write
              safer code from the first line.
            </p>
            <p>
              I work with React and Node.js on the web side, and I spend my
              free time on ethical hacking, security labs , and advance linux script and open source
              projects.
            </p>
            <p>
              My goal is simple: build things that work well and stay secure.
            </p>

            <a href="#contact" className="about__link">
              Get in touch
            </a>
          </Reveal>

          <Reveal className="about__card" delay={150} aria-label="Profile summary">
            <div className="about__card-bar">
              <span className="about__card-title">whoami</span>
            </div>
            <dl className="about__list">
              {profile.map(({ key, value }) => (
                <div key={key} className="about__row">
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}