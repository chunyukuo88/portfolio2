import { Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChangePassword } from './ChangePassword';
import { useAuth } from '../../features/auth/useAuth';
import { Cube } from '../../components/Cube/Cube';
import { selectCurrentUser, setCredentials } from '../../features/auth/authSlice.js';
import { LinkStyling } from '../../common/globalStyles';
import { selectCurrentLanguage } from '../../features/language/languageSlice';
import { LoggedOutContent } from './LoggedOutContent';
import strings from '../../common/strings.js';
import { routes } from '../../routes';
import './LoginPage.css';

export const LoginPage = () => {
  const language = useSelector(selectCurrentLanguage);
  const username = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changePassword, signIn, signOut } = useAuth();

  const logoutHandler = async () => {
    signOut().then(data => {
      const logOutPayload = {
        user: null,
        token: null,
      };
      dispatch(setCredentials(logOutPayload));
      navigate(routes.index);
    });
  };

  const LoggedInContent = () => (
    <>
      <h1>You are logged in.</h1>
      <ChangePassword changePassword={changePassword} />
      <button onClick={logoutHandler}>Logout</button>
    </>
  );

  return (
    <main id='login-page' style={{ color: 'white'}}>
      { username ? <LoggedInContent /> : <LoggedOutContent signIn={signIn} />}
      <p className='back-to-home'>
        <Link style={LinkStyling} to='/'>{strings.homePage[language]}</Link>
      </p>
      <div className='cube-wrapper'>
        <Cube />
      </div>
    </main>
  );
};
