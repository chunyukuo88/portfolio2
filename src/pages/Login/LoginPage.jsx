import { Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChangePassword } from './ChangePassword';
import { useAuth } from 'src/features/auth/useAuth';
import { Cube } from 'src/components/Cube/Cube';
import { setCredentials } from 'src/features/auth/authSlice.js';
import { LinkStyling } from 'src/common/globalStyles';
import { useCommonGlobals } from 'src/common/hooks';
import { LoggedOutContent } from './LoggedOutContent';
import strings from 'src/common/strings.js';
import { routes } from 'src/routes';
import './LoginPage.css';

export const LoginPage = () => {

  return (
    <div id='login-card-wrapper'>
      <div id='login-card'>
        Moist
      </div>
    </div>
  );

  // const [ language, username ] = useCommonGlobals(routes.login);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { changePassword, signIn, signOut } = useAuth();
  //
  // const logoutHandler = async () => {
  //   signOut().then(() => {
  //     const logOutPayload = {
  //       user: null,
  //       token: null,
  //     };
  //     dispatch(setCredentials(logOutPayload));
  //     navigate(routes.index);
  //   });
  // };
  //
  // const LoggedInContent = () => (
  //   <>
  //     <h1>You are logged in.</h1>
  //     <ChangePassword changePassword={changePassword} />
  //     <button onClick={logoutHandler} aria-label='Logout'>
  //       Logout
  //     </button>
  //   </>
  // );
  //
  // return (
  //   <main
  //     id='login-page'
  //     style={{ color: 'white'}}
  //     title={strings.login[language]}
  //   >
  //     {username ? <LoggedInContent /> : <LoggedOutContent signIn={signIn} />}
  //     <p className='back-to-home'>
  //       <Link
  //         style={LinkStyling}
  //         to={routes.index}
  //         aria-label={strings.backButton[language]}
  //       >
  //         {strings.backButton[language]}
  //       </Link>
  //     </p>
  //     <section className='cube-wrapper'>
  //       <Cube />
  //     </section>
  //   </main>
  // );
};
