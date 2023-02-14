import { Auth } from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCurrentUser,
  setCredentials,
  logout
} from './authSlice';

export function useAuth(){
  // const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const signIn = async (username, password) => {
    await Auth.signIn(username, password);
    console.log('signIn() - 1');
    const session = await Auth.currentSession();
    console.log('signIn() - 2');
    const jwtToken = session?.accessToken?.jwtToken;
    console.log('signIn() - 3');
    const currentUser = await Auth.currentAuthenticatedUser();
    console.log('signIn() - 4');
    dispatch(setCredentials({
      user: currentUser,
      token: jwtToken,
    }));
    console.log('signIn() - 5');
  };

  const signOut = async () => {
    await Auth.signOut();
    dispatch(logout);
  };

  return {
    signIn,
    signOut,
    user,
  };
}