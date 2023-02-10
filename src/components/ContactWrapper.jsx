import { animated, useTransition } from 'react-spring';
import { ContactLinks } from './ContactLinks';

export function ContactWrapper({ visible }){
  const transition = useTransition(visible, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 100, y: 800, opacity: 0 },
  });
  return (
    <div className='contact-links-wrapper'>
      {
        transition((style, item) => item
          ? <animated.div style={style}><ContactLinks /></animated.div>
          : ''
        )
      }
    </div>
  );
}
