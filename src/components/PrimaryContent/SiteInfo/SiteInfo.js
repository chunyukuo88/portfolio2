import { strings } from './strings';
import './SiteInfo.css';

export function SiteInfo(props) {
  const { skillClickHandler, language, menuIsOpen } = props;

  const getId = () => menuIsOpen
    ? 'site-info__blurry'
    : 'site-info';

  return (
    <article id={getId()} className={menuIsOpen ? 'blurry' : null} onClick={skillClickHandler}>
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
