import './AboutBlock.css';
import { animated, useTransition } from 'react-spring';

export function AboutBlock(){
  return (
    <div id='shadow'>
      <section className='about-block'>
        <div className='about-block-content-wrapper'>
          <span className='bread-emoji'>🍞</span>
          <p>Hi! I'm Alex Gochenour, the original Bread Monster</p>
          <p>I am a full-stack JavaScript developer deploying to AWS via the Serverless Framework and sometimes EC2. I'm passionate about best practices: TDD, pair programming, and Scrum are where it's at.</p>
        </div>
      </section>
    </div>
  )
}

export function AboutBlockWrapper({ visible }){
  const transition = useTransition(visible, {
    from: { x: 1000, y: 0, opacity: 1 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 1000, y: 0, opacity: 1 },
  });
  return (
    <div className='contact-links-wrapper'>
      {
        transition((style, item) => item
          ? <animated.div style={style}><AboutBlock /></animated.div>
          : ''
        )
      }
    </div>
  );
}
