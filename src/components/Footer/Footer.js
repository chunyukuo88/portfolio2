import GitHub from 'src/common/icons/contact_GH.svg';
import NPM from 'src/common/icons/contact_NPM.svg';
import LinkedIn from 'src/common/icons/contact_LinkedIn.svg';

export function Footer() {
  return (
    <footer>
      <span>
        <a href='https://github.com/chunyukuo88/' target='_blank' aria-label='GitHub Profile' rel='noopener noreferrer'>
          <img className='footer-icons' src={GitHub} alt='Github icon'/>
        </a>
      </span>
        <span>
          <a href='https://www.npmjs.com/package/gochenour' target='_blank' aria-label='My NPM library' rel='noopener noreferrer'>
            <img className='footer-icons' src={NPM} alt='NPM icon'/>
          </a>
        </span>
        <span>
          <a href='https://www.linkedin.com/in/alex-gochenour/' target='_blank' aria-label='LinkedIn Profile' rel='noopener noreferrer'>
            <img className='footer-icons' src={LinkedIn} alt='LinkedIn icon'/>
          </a>
        </span>
    </footer>
  );
}
