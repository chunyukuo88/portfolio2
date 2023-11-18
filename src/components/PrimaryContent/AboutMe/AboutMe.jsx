import './AboutMe.css';
import { useCommonGlobals } from 'src/common/hooks';
import strings from 'src/common/strings';
import { routes } from 'src/routes';

export function AboutMe(props) {
  const { menuIsOpen } = props;
  const [language] = useCommonGlobals(routes.index);

  const germanFontSize = () => language === strings.GERMAN
    ? { fontSize: '1rem'}
    : null;

  return (
    <article id='about-me' className={menuIsOpen ? 'blurry' : null}>
      <section style={germanFontSize()}>
        {strings.aboutMeSpiel[language]}
      </section>
    </article>
  );
}
