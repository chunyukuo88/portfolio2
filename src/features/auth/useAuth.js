import { useCallback, useState } from 'react';
import { Auth } from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCurrentUser,
  setCredentials,
  logout
} from './authSlice';

export function useAuth(){
  const [codeWasSent, setCodeWasSent] = useState();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const signIn = async (username, password) => {
    await Auth.signIn(username, password);
    const currentUser = await Auth.currentAuthenticatedUser();
    return currentUser;
  };

  const changePassword = async (username, oldPassword, newPassword) => {
    Auth.changePassword(user, oldPassword, newPassword)
      .then(data => console.log(data))
      .catch(e => console.error(e));
  };

  const forgotPassword = useCallback(
  async (username) => {
    console.log('forgotPassword() - 1');
    Auth.forgotPassword(username).then(data => console.log(data));
    console.log('forgotPassword() - 2');
    setCodeWasSent(true);
    console.log('forgotPassword() - 3');
  }, []);

  /**
  * @username string The username, rather than their email address.
  * @password string The new password
  * @code string This is what gets sent to the user's email.
  * */
  const forgotPasswordSubmit = useCallback(
    async (username, password, code) => {
      await Auth.forgotPasswordSubmit(username, code, password);
    },
    [],
  );

  const signOut = async () => {
    await Auth.signOut();
    dispatch(logout);
  };

  return {
    changePassword,
    codeWasSent,
    forgotPassword,
    forgotPasswordSubmit,
    signIn,
    signOut,
    user,
  };
}
