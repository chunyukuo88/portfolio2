import './AboutMe.css';

const style = {
  margin: '1rem',
  textAlign: 'justify',
};

export function AboutMe(props) {
  const { menuIsOpen } = props;

  return (
    <article id='about-me' className={menuIsOpen ? 'blurry' : null } style={style}>
      <div>I love sustainable development practices and test-driven code. I find that
        pairing spreads knowledge quickly and results in shorter feedback loops, code of higher quality and readability,
        and shorter code reviews, which are also best done in pairs or mobs. All of this saves $$$ and makes for more
        natural interactions with my peers. Agile practices like these led me to pursue Scrum certification.
        I specialize in front-end development, but I have also crafted deployment pipelines and robust, well-tested
        microservices for Kapitus, MadHive, Offor Health, and NetJets. As a former linguist, I value readability,
        clarity, and effective communication.
      </div>
    </article>
  );
}
