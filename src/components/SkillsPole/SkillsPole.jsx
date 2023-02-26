import { useState} from 'react';
import ReduxIcon from '../../common/icons/tech_redux-icon.svg';
import LambdaIcon from '../../common/icons/tech_lambda-icon.svg'
import NodeIcon from '../../common/icons/tech_node-js-icon.svg';
import SvelteIcon from '../../common/icons/tech_svelte-icon.svg';
import DockerIcon from '../../common/icons/tech_docker.svg';
import ServerlessIcon from '../../common/icons/tech_serverless-icon.svg';
import './SkillsPole.css';

export function SkillsPole(){
  const [displayRedux, setDisplayRedux] = useState(true);
  const [displayLambda, setDisplayLambda] = useState(true);
  const [displayNode, setDisplayNode] = useState(true);
  const [displaySvelte, setDisplaySvelte] = useState(true);
  const [displayDocker, setDisplayDocker] = useState(true);
  const [displaySls, setDisplaySls] = useState(true);


  return (
    <ul id='skills-pole'>
      <li
        onMouseEnter={() => setDisplayRedux(false)}
        onMouseLeave={() => setDisplayRedux(true)}
        className='skill-block'
      >
        {displayRedux ? 'React + Redux' : <span><img className='tech-icons' src={ReduxIcon} alt='redux icon'/></span>}
      </li>
      <li
        onMouseEnter={() => setDisplayLambda(false)}
        onMouseLeave={() => setDisplayLambda(true)}
        className='skill-block'
      >
        {displayLambda ? 'AWS' : <span><img className='tech-icons' src={LambdaIcon} alt='aws-icon'/></span>}
      </li>
      <li
        onMouseEnter={() => setDisplayNode(false)}
        onMouseLeave={() => setDisplayNode(true)}
        className='skill-block'
      >
        {displayNode ? 'Node.js' : <span><img className='tech-icons' src={NodeIcon} alt='node-icon'/></span>}
      </li>
      <li
        onMouseEnter={() => setDisplaySvelte(false)}
        onMouseLeave={() => setDisplaySvelte(true)}
        className='skill-block'
      >
        {displaySvelte ? 'Svelte' : <span><img className='tech-icons' src={SvelteIcon} alt='svelte-icon'/></span>}
      </li>
      <li
        onMouseEnter={() => setDisplayDocker(false)}
        onMouseLeave={() => setDisplayDocker(true)}
        className='skill-block'
      >
        {displayDocker ? 'Docker' : <span><img className='tech-icons' src={DockerIcon} alt='docker-icon'/></span>}
      </li>
      <li
        onMouseEnter={() => setDisplaySls(false)}
        onMouseLeave={() => setDisplaySls(true)}
        className='skill-block'
      >
        {displaySls ? 'Serverless Framework' : <span><img className='tech-icons' src={ServerlessIcon} alt='serverless-icon' /></span>}
      </li>
    </ul>
  );
}
