import {useSelector} from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSlice';
import { useCommonGlobals } from '../../common/hooks';
import { Link, useNavigate } from 'react-router-dom';

import strings from 'src/common/strings';
import { routes } from 'src/routes';

export function ExerciseHub(){
  const [ language, username ] = useCommonGlobals(routes.blog);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();

  return (
    <li id='workouts-button' role='button' onClick={() => navigate(routes.workouts)}>
      <Link to={routes.workouts}>
        {strings.workouts[language]}
      </Link>
    </li>
  );
}
