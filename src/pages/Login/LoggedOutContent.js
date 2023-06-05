import { selectCurrentLanguage } from 'src/features/language/languageSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from 'src/features/auth/authSlice';
import { routes } from 'src/routes';
import { useSelector, useDispatch } from 'react-redux';
import strings from 'src/common/strings';
import { useEffect, useRef, useState } from 'react';

export const LoggedOutContent = ({ signIn }) => {
  const language = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const userData = await signIn(user, pwd);
      const payload = {
        username: userData.username,
        token: userData.signInUserSession.accessToken.jwtToken,
      }
      dispatch(setCredentials(payload));
    } catch (e) {
      handleError(e)
    }
  };

  const handleUserInput = (event) => setUser(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  return (
    <section className='logged-out-section'>
      <h1 className='logged-out-section-heading'>{strings.login[language]}</h1>
      <p
        style={{ color: 'red' }}
        className={errMsg ? 'display-error-message' : 'offscreen'}
        aria-describedby='form submission'
        aria-live='assertive'
        role='alert'
      >
        {errMsg}
      </p>
      <form className='logout-out-form' onSubmit={handleSubmit}>
        <fieldset className='inputs-wrapper'>
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
        </fieldset>
        <button className='login-button' title='login button'>{strings.login[language]}</button>
      </form>
    </section>
  );
}
