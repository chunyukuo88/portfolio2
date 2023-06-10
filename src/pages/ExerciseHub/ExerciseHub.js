import { Link, useNavigate } from 'react-router-dom';
import { useCommonGlobals } from 'src/common/hooks';
import { selectCurrentToken } from 'src/features/auth/authSlice';
import { useSelector } from 'react-redux';

import strings from 'src/common/strings';
import { routes } from 'src/routes';
import { LinkStyling } from 'src/common/globalStyles';
import './ExerciseHub.css';

export function ExerciseHub(){
  const [ language, username ] = useCommonGlobals(routes.blog);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  const WorkoutString = username
    ? `My ${strings.workouts[language]}`
    : strings.workouts[language];

  return (
    <>
      <p className='back-to-home'>
        <Link
          style={LinkStyling}
          to={routes.index}
          aria-label={strings.backButton[language]}
        >
          {strings.backButton[language]}
        </Link>
      </p>
      <ul id='exercise-menu'>
        <li id='login-from-exercise-page' role='button' onClick={() => navigate(routes.login)}>
          <Link>
            {strings.login[language]}
          </Link>
        </li>
        <li id='workouts-button' role='button' onClick={() => navigate(routes.workouts)}>
          <Link to={routes.workouts}>
            {username ? strings.myWorkouts[language] : strings.workouts[language]}
          </Link>
        </li>
      </ul>
    </>
  );
}
