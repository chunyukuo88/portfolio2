import GitHub from 'src/common/icons/contact_GH.svg';
import NPM from 'src/common/icons/contact_NPM.svg';
import LinkedIn from 'src/common/icons/contact_LinkedIn.svg';
import YouTube from 'src/common/icons/contact_YouTube.svg';
import './ContactLinks.css';

export const ContactLinks = () => (
  <ul id='contact-icons-array'>
    <li className='contact-coin'>
      <a 
        href='https://github.com/chunyukuo88/' 
        target='_blank' 
        rel='noreferrer' 
        aria-hidden='true' 
        title='Public repositories of Alex Gochenour'
      >
        <img className='contact-icons' src={GitHub} alt='GitHub icon link'/>
      </a>
    </li>
    <li className='contact-coin'>
      <a 
        href='https://www.npmjs.com/package/gochenour' 
        target='_blank' 
        rel='noreferrer' 
        aria-hidden='true' 
        title='The free-to-use package I maintain on NPM'
      >
        <img className='contact-icons' src={NPM} alt='NPM icon link'/>
      </a>
    </li>
    <li className='contact-coin'>
      <a
        href='https://www.linkedin.com/in/alex-gochenour/'
        target='_blank'
        rel='noreferrer'
        aria-hidden='true'
        title='My LinkedIn profile'
      >
        <img className='contact-icons' src={LinkedIn} alt='LinkedIn icon link'/>
      </a>
    </li>
    <li className='contact-coin'>
      <a
        href='https://tinyurl.com/yckz8uwa'
        target='_blank' rel='noreferrer'
        aria-hidden='true'
        title='My old YouTube channel'
      >
        <img className='contact-icons' src={YouTube} alt='YouTube icon link'/>
      </a>
    </li>
  </ul>
);
