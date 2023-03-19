import { ContactLinks } from '../ContactTiles/ContactLinks';
import './AboutBlock.css';

export function AboutBlock(){
  return (
    <div id='about-block-wrapper' role='complementary'>
      <div id='shadow'>
        <ContactLinks />
        <article className='about-block' aria-labelledby='about-heading'>
          <section className='about-block-content-wrapper'>
            <header>
              <h4 id='about-heading'>Hi! I'm Alex Gochenour.</h4>
            </header>
            <h5>I'm a full-stack JavaScript developer deploying to Amazon Web Services (AWS) using the Serverless Framework and sometimes EC2. I'm passionate about best practices: TDD, pair programming, and Scrum are where it's at.</h5>
          </section>
        </article>
      </div>
    </div>
  );
}

