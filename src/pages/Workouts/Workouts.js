import { LinkStyling } from 'src/common/globalStyles';
import { useCommonGlobals } from 'src/common/hooks';
import strings from 'src/common/strings';
import { Link } from 'react-router-dom';
import { routes } from 'src/routes';

export function Workouts(){
  const [ language ] = useCommonGlobals(routes.workouts);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: 'white',
    fontSize: '3rem',
  };
  return (
    <>
      <nav className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.backButton[language]}
        </Link>
      </nav>
      <div style={style}>
        Coming soon!
      </div>
    </>
  );
}
