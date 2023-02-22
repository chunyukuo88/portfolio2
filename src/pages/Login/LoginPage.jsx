import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  const { signIn, signOut } = useAuth();

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
      <ChangePassword />
      <button onClick={logoutHandler}>Logout</button>
    </>
  );

  return (
    <main style={{ color: 'white'}}>
      { username ? <LoggedInContent /> : <LoggedOutContent signIn={signIn} />}
      <p>
        <Link style={LinkStyling} to='/'>{strings.homePage[language]}</Link>
      </p>
      <div className='cube-wrapper'>
        <Cube />
      </div>
    </main>
  );
};

const ChangePassword = () => {
  const language = useSelector(selectCurrentLanguage);
  const userRef = useRef();
  const errRef = useRef();
  const { signIn } = useAuth();
  const [user, setUser] = useState('');
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    userRef.current.focus();
  }, []);
  const handleError = (error) => {
    if (!error?.originalStatus) setErrMsg('No server response');
    else if (error.originalStatus?.status === 400) setErrMsg('Missing username or password');
    else if (error.originalStatus?.status === 401) setErrMsg('Unauthorized');
    else setErrMsg('LoginPage failed');
    errRef.current.focus();
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(user, oldPwd, newPwd).unwrap();
    } catch (e) {
      handleError(e)
    }
  }
  const handleUserInput = (event) => setUser(event.target.value);
  const handleOldPwdInput = (event) => setOldPwd(event.target.value);
  const handleNewPwdInput = (event) => setNewPwd(event.target.value);

  return (
    <section>
      <p ref={errRef} style={{ color: 'red'}} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <h1>{strings.resetPassword[language]}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>{strings.username[language]}</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete='off'
          required
        />
        <label htmlFor='old-password'>{strings.passwordOld[language]}</label>
        <input
          type='password'
          id='old-password'
          onChange={handleOldPwdInput}
          value={oldPwd}
          required
        />
        <label htmlFor='new-password'>{strings.passwordNew[language]}</label>
        <input
          type='password'
          id='new-password'
          onChange={handleNewPwdInput}
          value={newPwd}
          required
        />
        <button>{strings.resetPassword[language]}</button>
      </form>
    </section>
  );
};

