import { selectCurrentLanguage } from '../../features/language/languageSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../features/auth/authSlice';
import { routes } from '../../routes';
import { useSelector, useDispatch } from 'react-redux';
import strings from '../../common/strings';
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
      navigate(routes.index);
    } catch (e) {
      handleError(e)
    }
  };

  const handleUserInput = (event) => setUser(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  return (
    <section className='logged-out-section'>
      <h1 className='logged-out-section-heading'>{strings.login[language]}</h1>
      <p style={{ color: 'red' }} className={errMsg ? 'display-error-message' : 'offscreen'}>
        {errMsg}
      </p>
      <form className='logout-out-form' onSubmit={handleSubmit}>
        <div className='inputs-wrapper'>
          <div className='username-input'>
            <input
              type='text'
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
              data-testid='password-input'
              id='password'
              onChange={handlePwdInput}
              placeholder={strings.password[language]}
              value={pwd}
              required
            />
          </div>
        </div>
        <button className='login-button'>{strings.login[language]}</button>
      </form>
    </section>
  );
}
