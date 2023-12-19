import { useEffect, useState } from 'react';
import strings from 'src/common/strings';
import './Skills.css';

export function Skills(props) {
  const { skillClickHandler, language, menuIsOpen } = props;

  const getId = () => menuIsOpen
    ? 'tech-skills-abridged__blurry'
    : 'tech-skills-abridged';

  const [serverlessStyle, setServerlessStyle] = useState('');
  const [tddStyle, setTddStyle] = useState('');
  const [lambdasStyle, setLambdasStyle] = useState('');
  const [testingLibrary, setTestingLibrary] = useState('');
  const [webComponents, setWebComponents] = useState('');
  const [docker, setDocker] = useState('');
  const [reactQuery, setReactQuery] = useState('');
  const [redis, setRedis] = useState('');
  const [svelte, setSvelte] = useState('');
  const [supabase, setSupabase] = useState('');
  const [gql, setGql] = useState('');
  const [scrum, setScrum] = useState('');
  const [react, setReact] = useState('');
  const [msw, setMsw] = useState('');
  const [css, setCss] = useState('');

  useEffect(() => {
    setTimeout(() => { setServerlessStyle('dynamic-emergence')}, 800);
    setTimeout(() => { setTddStyle('dynamic-emergence')}, 1200);
    setTimeout(() => { setLambdasStyle('dynamic-emergence')}, 1600);

    setTimeout(() => { setTestingLibrary('dynamic-emergence')}, 2400);
    setTimeout(() => { setWebComponents('dynamic-emergence')}, 2800);
    setTimeout(() => { setDocker('dynamic-emergence')}, 3200);

    setTimeout(() => { setReactQuery('dynamic-emergence')}, 3600);
    setTimeout(() => { setRedis('dynamic-emergence')}, 4000);
    setTimeout(() => { setSvelte('dynamic-emergence')}, 4400);

    setTimeout(() => { setSupabase('dynamic-emergence')}, 4800);
    setTimeout(() => { setGql('dynamic-emergence')}, 5200);
    setTimeout(() => { setScrum('dynamic-emergence')}, 5600);

    setTimeout(() => { setReact('dynamic-emergence')}, 6000);
    setTimeout(() => { setMsw('dynamic-emergence')}, 6400);
    setTimeout(() => { setCss('dynamic-emergence')}, 6800);

    setTimeout(() => { setTddStyle('highlighted-skill')}, 7200);
  }, []);

  return (
    <ul id={getId()} onClick={skillClickHandler}>
      <li className={serverlessStyle}>The Serverless Framework</li>
      <li className={tddStyle}>{strings.techSkillsTDD[language]}</li>
      <li className={lambdasStyle}>Lambdas with Node.js</li>
      <li className={testingLibrary}>Testing Library</li>
      <li className={webComponents}>Web Components</li>
      <li className={docker}>Docker Compose</li>
      <li className={reactQuery}>React Query</li>
      <li className={redis}>Redis Cloud</li>
      <li className={svelte}>SvelteKit</li>
      <li className={supabase}>Supabase</li>
      <li className={gql}>GraphQL</li>
      <li className={scrum}>Scrum</li>
      <li className={react}>React</li>
      <li className={msw}>msw</li>
      <li className={css}>css</li>
    </ul>
  );
}
