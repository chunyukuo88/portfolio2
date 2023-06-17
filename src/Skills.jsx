import strings from "./common/strings";

export function Skills(props) {
  const { skillClickHandler, language, settingsAreVisible } = props;

  const getId = () => settingsAreVisible
    ? 'tech-skills-abridged__blurry'
    : 'tech-skills-abridged';

  return (
    <ul id={getId()} onClick={skillClickHandler}>
      <li>The Serverless Framework</li>
      <li>{strings.techSkillsTDD[language]}</li>
      <li>Lambdas with Node.js</li>
      <li>Web Components</li>
      <li>Docker Compose</li>
      <li>Testing Library</li>
      <li>Redis Cloud</li>
      <li>Supabase</li>
      <li>SvelteKit</li>
      <li>Scrum</li>
      <li>React</li>
      <li>msw</li>
      <li>css</li>
    </ul>
  );
}