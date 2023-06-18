import { strings } from './strings';
import './SiteInfo.css';

export function SiteInfo(props) {
  const { skillClickHandler, language, menuIsOpen } = props;

  return (
    <article id='site-info' className={menuIsOpen ? 'blurry' : null} onClick={skillClickHandler}>
      <h3>{strings.abridgedVersionTitle[language]}</h3>
      <p>{strings.abridgedVersionBody[language]}</p>
      <h3>{strings.unabridgedVersionTitle[language]}</h3>
      <p>{strings.unabridgedVersionBody[language]}</p>
      <p>{strings.paragraph1[language]}</p>
      <p>{strings.paragraph2[language]}</p>
      <p>{strings.paragraph3[language]}</p>
      <p>{strings.thanksForStoppingBy[language]}</p>
    </article>
  );
}
