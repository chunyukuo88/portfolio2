import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice';

export function useAuth(){
  const user = useSelector(selectCurrentUser);

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

  const signOut = async () => {
    const promise = await Auth.signOut();
    return promise;
  };

  return {
    changePassword,
    signIn,
    signOut,
    user,
  };
}
