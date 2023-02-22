import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../features/auth/useAuth';
import { selectCurrentLanguage } from '../../features/language/languageSlice';
import strings from '../../common/strings.js';

export const ChangePassword = () => {
  const language = useSelector(selectCurrentLanguage);
  const userRef = useRef();
  const { changePassword } = useAuth();
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
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await changePassword(user, oldPwd, newPwd).unwrap();
    } catch (e) {
      handleError(e)
    }
  };
  const handleUserInput = (event) => setUser(event.target.value);
  const handleOldPwdInput = (event) => setOldPwd(event.target.value);
  const handleNewPwdInput = (event) => setNewPwd(event.target.value);

  return (
    <section>
      <p style={{ color: 'red'}} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
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
