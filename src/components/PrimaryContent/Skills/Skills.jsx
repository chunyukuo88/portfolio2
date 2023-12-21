import strings from 'src/common/strings';
import './Skills.css';

export function Skills(props) {
  const { skillClickHandler, language, menuIsOpen } = props;

  const getId = () => menuIsOpen
    ? 'tech-skills-abridged__blurry'
    : 'tech-skills-abridged';

  return (
    <ul id={getId()} onClick={skillClickHandler}>
      <li>The Serverless Framework</li>
      <li id='tdd'>{strings.techSkillsTDD[language]}</li>
      <li>Lambdas with Node.js</li>
      <li>Testing Library</li>
      <li>Web Components</li>
      <li>Docker Compose</li>
      <li>React Query</li>
      <li>Redis Cloud</li>
      <li>SvelteKit</li>
      <li>Supabase</li>
      <li>GraphQL</li>
      <li>Scrum</li>
      <li>React</li>
      <li>msw</li>
      <li>css</li>
    </ul>
  );
}
