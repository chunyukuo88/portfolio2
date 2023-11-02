import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from 'src/globalState/language/languageSlice';
import strings from 'src/common/strings.js';

export const ChangePassword = ({ changePassword }) => {
  const language = useSelector(selectCurrentLanguage);
  const [user, setUser] = useState('');
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const userRef = useRef();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  const handleError = (error) => {
    if (!error?.originalStatus) setErrMsg('No server response');
    else setErrMsg('Unauthorized');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await changePassword(user, oldPwd, newPwd);
    } catch (e) {
      handleError(e)
    }
  };
  const handleUserInput = (event) => setUser(event.target.value);
  const handleOldPwdInput = (event) => setOldPwd(event.target.value);
  const handleNewPwdInput = (event) => setNewPwd(event.target.value);

  return (
    <fieldset>
      <p
        style={{ color: 'red'}}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >{errMsg}</p>
      <legend>{strings.resetPassword[language]}</legend>
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
        <button id='reset-password-button'>{strings.resetPassword[language]}</button>
      </form>
    </fieldset>
  );
};
