import Mail from 'src/common/icons/contact.svg';
import GitHub from 'src/common/icons/contact_GH.svg';
import NPM from 'src/common/icons/contact_NPM.svg';
import LinkedIn from 'src/common/icons/contact_LinkedIn.svg';

export function Footer() {
  return (
    <footer>
      <span>
        <img className='main-icons' src={Mail} alt='Mail icon'/>
      </span>
    <span>
      <a href='https://github.com/chunyukuo88/' target='_blank' rel='noreferrer'>
        <img className='main-icons' src={GitHub} alt='Github icon'/>
      </a>
    </span>
      <span>
        <a href='https://www.npmjs.com/package/gochenour' target='_blank' rel='noreferrer'>
          <img className='main-icons' src={NPM} alt='NPM icon'/>
        </a>
      </span>
      <span>
        <a href='https://www.linkedin.com/in/alex-gochenour/' target='_blank' rel='noreferrer'>
          <img className='main-icons' src={LinkedIn} alt='LinkedIn icon'/>
        </a>
      </span>
    </footer>
  );
}