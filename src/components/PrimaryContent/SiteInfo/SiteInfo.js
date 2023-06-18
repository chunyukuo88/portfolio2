import { strings } from './strings';

export function SiteInfo(props) {
  const { skillClickHandler, language, settingsAreVisible } = props;

  const getId = () => settingsAreVisible
    ? 'site-info__blurry'
    : 'site-info';

  return (
    <article id={getId()} onClick={skillClickHandler}>
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
