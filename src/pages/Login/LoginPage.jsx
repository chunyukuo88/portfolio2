import { useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../features/auth/useAuth';
import { Cube } from '../../components/Cube/Cube';
import { setCredentials } from '../../features/auth/authSlice.js';
import strings from '../../common/strings.js';
import './LoginPage.css';

export const LoginPage = () => {
  const language = useSelector((state) => state.language.value);
  const [displayLogin, setDisplayLogin] = useState(true);

  const LinkStyling = { color: '#00ec00', textDecoration: 'none', textTransform: 'uppercase'};
  return (
    <main style={{ color: 'white'}}>
      <button onClick={() => setDisplayLogin(!displayLogin)}>{strings.switch[language]}</button>
      {displayLogin ? <LoginContent/> : <ChangePassword />}
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
  const language = useSelector((state) => state.language.value);
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
      <h1>change pw</h1>
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
        <button>Change pw</button>
      </form>
    </section>
  );
};

const LoginContent = () => {
  const { signIn } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const language = useSelector((state) => state.language.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);
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
      // const userData = await signIn(user, pwd).unwrap();
      const userData = await signIn(user, pwd);
      const payload = {
        username: userData.user.username,
        token: userData.signInUserSession.accessToken.jwtToken,
      }
      dispatch(setCredentials(payload));
      navigate('/');
    } catch (e) {
      handleError(e)
    }
  }
  const handleUserInput = (event) => setUser(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  return (
    <section>
      <p ref={errRef} style={{ color: 'red'}} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <h1>{strings.login[language]}</h1>
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
        <label htmlFor='password'>{strings.password[language]}</label>
        <input
          type='password'
          id='password'
          onChange={handlePwdInput}
          value={pwd}
          required
        />
        <button>{strings.login[language]}</button>
      </form>
    </section>
  );
}
