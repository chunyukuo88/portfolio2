import strings from 'src/common/strings';
import './Skills.css';

export function Skills(props) {
  const { skillClickHandler, language, menuIsOpen } = props;

  const getId = () => menuIsOpen
    ? 'tech-skills-abridged__blurry'
    : 'tech-skills-abridged';

  return (
    <ul id={getId()} onClick={skillClickHandler}>
      <li>the serverless framework</li>
      <li id='tdd'>{strings.techSkillsTDD[language]}</li>
      <li>testing library</li>
      <li>web components</li>
      <li>docker compose</li>
      <li>react query</li>
      <li>redis cloud</li>
      <li>sveltekit</li>
      <li>supabase</li>
      <li>graphql</li>
      <li>scrum</li>
      <li>react</li>
      <li>node</li>
      <li>msw</li>
      <li>css</li>
      <li>go</li>
      <li>λ</li>
    </ul>
  );
}
