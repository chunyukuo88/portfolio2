const style = {
  margin: '1rem',
  textAlign: 'justify',
};

export function AboutMe() {
  return (
    <article style={style}>
      <div>I love sustainable development practices and test-driven code. I find that
        pairing spreads knowledge quickly and results in shorter feedback loops, code of higher quality and readability,
        and shorter code reviews, which are also best done in pairs or mobs. All of this saves $$$ and makes for more
        humane interactions with my peers. Agile practices like these led me to pursue Scrum certification.
        I specialize in front-end development, but I have crafted deployment pipelines and robust, well-tested
        microservices for Kapitus, MadHive, Offor Health, and NetJets. As a former linguist, I value readability,
        clarity, and effective communication.
      </div>
    </article>
  );
}
