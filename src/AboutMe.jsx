const style = {
  margin: '1rem',
  textAlign: 'justify',
};

export function AboutMe() {
  return (
    <article style={style}>
      <div>I am passionate about sustainable development processes and love writing test-driven code. I find that
        pairing spreads knowledge quickly and results in shorter feedback loops, code of higher quality and readability,
        and shorter code reviews, which are also best done in pairs or mobs. All of this saves $$$ and makes for more
        humane interactions with my peers. I love Agile practices like these and many others, which is what led me to
        pursue Scrum certification. My expertise is in front-end development but I have written plenty of robust,
        well-tested microservices for Kapitus, MadHive, Offor Health, and NetJets.
      </div>
    </article>
  );
}
