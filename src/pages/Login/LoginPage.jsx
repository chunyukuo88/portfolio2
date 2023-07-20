import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonGlobals } from 'src/common/hooks';
import { useAuth } from 'src/features/auth/useAuth';

import { updateLanguage } from 'src/features/language/languageSlice';
import { setCredentials } from 'src/features/auth/authSlice.js';

import strings, { contentKeys } from 'src/common/strings.js';
import { routes } from 'src/routes';
import './LoginPage.css';

import { ChangePassword } from './ChangePassword';
import { LoggedOutContent } from './LoggedOutContent';

export const LoginPage = ({ setPrimaryContentKey }) => {
  const [ language, username ] = useCommonGlobals(routes.login);
  const dispatch = useDispatch();
  const { changePassword, signIn, signOut } = useAuth();
  const userRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleError = (error) => {
    if (!error?.originalStatus) setErrMsg('No server response');
    else if (error.originalStatus?.status === 401) setErrMsg('Unauthorized');
    else setErrMsg('LoginPage failed');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { username, signInUserSession } = await signIn(user, pwd);
      const payload = {
        username,
        token: signInUserSession.accessToken.jwtToken,
      }
      dispatch(setCredentials(payload));
      dispatch(updateLanguage(strings.CHINESE));
      setPrimaryContentKey(contentKeys.SKILLS);
    } catch (e) {
      handleError(e)
    }
  };

  const handleUserInput = (event) => setUser(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  // const logoutHandler = async () => {
  //   signOut().then(() => {
  //     const logOutPayload = {
  //       user: null,
  //       token: null,
  //     };
  //     dispatch(setCredentials(logOutPayload));
  //     setPrimaryContentKey();
  //   });
  // };
  // const LoggedInContent = () => (
  //   <>
  //     <h1>You are logged in.</h1>
  //     <ChangePassword changePassword={changePassword} />
  //     <button onClick={logoutHandler} aria-label='Logout'>
  //       Logout
  //     </button>
  //   </>
  // );

  return (
    <div id='login-card-wrapper'>
      <div id='login-card'>
        <h1 className='logged-out-section-heading'>{strings.login[language]}</h1>
        <div className='username-input'>
          <input
            type='text'
            label='username input'
            data-testid='username-input'
            id='username'
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            placeholder={strings.username[language]}
            autoComplete='off'
            required
          />
        </div>
        <div className='password-input'>
          <input
            type='password'
            label='password input'
            data-testid='password-input'
            id='password'
            onChange={handlePwdInput}
            placeholder={strings.password[language]}
            value={pwd}
            required
          />
        </div>
      </div>
    </div>
  );

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
