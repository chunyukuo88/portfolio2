import GitHub from '../common/icons/contact_GH.svg';
import NPM from '../common/icons/contact_NPM.svg';
import LinkedIn from '../common/icons/contact_LinkedIn.svg';
import YouTube from '../common/icons/contact_YouTube.svg';
import './ContactLinks.css';

export const ContactLinks = () => {
  return (
    <ul id='contact-icons-array'>
      <li className='contact-coin'>
        <a href="#" aria-hidden='true'>
          <img className='contact-icons' src={GitHub} alt="GitHub icon"/>
        </a>
      </li>
      <li className='contact-coin'>
        <a href="#" aria-hidden='true'>
          <img className='contact-icons' src={NPM} alt="NPM icon"/>
        </a>
      </li>
      <li className='contact-coin'>
        <a href="#" aria-hidden='true'>
          <img className='contact-icons' src={LinkedIn} alt="LinkedIn icon"/>
        </a>
      </li>
      <li className='contact-coin'>
        <a href="#" aria-hidden='true'>
          <img className='contact-icons' src={YouTube} alt="YouTube icon"/>
        </a>
      </li>
    </ul>
  )
}