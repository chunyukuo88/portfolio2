import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../features/auth/useAuth';

import { setCredentials } from '../../features/auth/authSlice.js';
import strings from '../../common/strings.js';

export const LoginPage = () => {
  const [displayLogin, setDisplayLogin] = useState(true);

  return (
    <main>
      <button onClick={() => setDisplayLogin(!displayLogin)}>Switch</button>
      {displayLogin ? <LoginContent/> : <ResetPasswordContent />}
    </main>
  );
};

const ResetPasswordContent = () => {
  const language = useSelector((state) => state.language.value);
  const { resetPassword } = useAuth();
  const [user, setUser] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const userRef = useRef();
  const errRef = useRef();
  const handleError = (error) => {
    if (!error?.originalStatus) setErrMsg('No server response');
    else if (error.originalStatus?.status === 400) setErrMsg('Missing username or password');
    else if (error.originalStatus?.status === 401) setErrMsg('Unauthorized');
    else setErrMsg('LoginPage failed');
    errRef.current.focus();
  }
  const submissionHandler = async (event) => {
    event.preventDefault();
    try {
      const result = resetPassword(user, oldPwd, newPwd);
      console.log('submissionHandler() - result');
    } catch (e) {
      handleError(e)
    }
  };

  const handleUserInput = (event) => setUser(event.target.value);
  const handleOldPwdInput = (event) => setOldPwd(event.target.value);
  const handleNewPwdInput = (event) => setNewPwd(event.target.value);
  return (
    <section>
      <p ref={errRef} style={{ color: 'red'}} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <p>Change Password</p>
      <form onSubmit={submissionHandler}>
        <label htmlFor='username'>{strings.username[language]}</label>
        <input
          type="text"
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
      const userData = await signIn(user, pwd).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      navigate('/');
    } catch (e) {
      handleError(e)
    }
  }
  const handleUserInput = (event) => setUser(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  return (
    <section style={{ color: 'white'}}>
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

