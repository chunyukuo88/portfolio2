import { animated, useTransition } from 'react-spring';
import { ContactLinks } from './ContactLinks';

export function ContactWrapper(){

  return (
    <div className='contact-links-wrapper'>
      <ContactLinks />
    </div>
  );
}
