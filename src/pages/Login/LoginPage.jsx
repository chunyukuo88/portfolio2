import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCommonGlobals } from 'src/common/hooks';
import { useAuth } from 'src/globalState/auth/useAuth';

import { updateLanguage } from 'src/globalState/language/languageSlice';
import { setCredentials } from 'src/globalState/auth/authSlice.js';

import strings, { contentKeys } from 'src/common/strings.js';
import { routes } from 'src/routes';
import './LoginPage.css';
import {Auth} from "aws-amplify";

export const LoginPage = (props) => {
  const { setPrimaryContentKey } = props;
  const [ language ] = useCommonGlobals(routes.login);
  const dispatch = useDispatch();
  const { signIn } = useAuth();
  const userRef = useRef();
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [userName, pwd]);

  const handleError = (error) => {
    if (!error?.originalStatus) setErrMsg('No server response');
    else if (error.originalStatus?.status === 401) setErrMsg('Unauthorized');
    else setErrMsg('LoginPage failed');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { username, signInUserSession } = await signIn(userName, pwd);
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

  const handleUserInput = (event) => setUserName(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  return (
    <div id='login-card-wrapper'>
      <div id='login-card'>
        <h1 className='logged-out-section-heading'>{`< ${strings.login[language]} >`}</h1>
        <form className='logout-out-form' onSubmit={handleSubmit}>
          <fieldset className='inputs-wrapper'>
            <div className='username-input'>
              <input
                type='text'
                label='username input'
                data-testid='username-input'
                id='username'
                ref={userRef}
                value={userName}
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
          </fieldset>
          <button className='login-button' title='login button'>{strings.submit[language]}</button>
        </form>
      </div>
    </div>
  );
};
