import ReduxIcon from '../../common/icons/tech_redux-icon.svg';
import LambdaIcon from '../../common/icons/tech_lambda-icon.svg'
import NodeIcon from '../../common/icons/tech_node-js-icon.svg';
import SvelteIcon from '../../common/icons/tech_svelte-icon.svg';
import DockerIcon from '../../common/icons/tech_docker.svg';
import ServerlessIcon from '../../common/icons/tech_serverless-icon.svg';
import './SkillsPole.css';

export function SkillsPole(){
  return (
    <ul id='skills-pole'>
      <li className='skill-block'>
        React + Redux
        <span><img
          className='tech-icons'
          src={ReduxIcon}
          alt='redux icon'
        /></span>
      </li>
      <li className='skill-block'>
        AWS
        <span><img src={LambdaIcon} alt="aws-icon"/></span>
      </li>
      <li className='skill-block'>
        Node.js
        <span>
          <img
            src={NodeIcon}
            alt="node-icon"
          />
        </span>
      </li>
      <li className='skill-block'>
        Svelte
        <span>
          <img
            src={SvelteIcon}
            alt="svelte-icon"
          />
        </span>
      </li>
      <li className='skill-block'>
        Docker
        <span>
          <img
            src={DockerIcon}
            alt="docker-icon"
          />
        </span>
      </li>
      <li className='skill-block'>
        Serverless Framework
        <span>
          <img
            src={ServerlessIcon}
            alt="serverless-icon"
          />
        </span>
      </li>
      <li className='skill-block'></li>
    </ul>
  );
}
