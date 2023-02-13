import React, { useCallback, useState } from 'react';
import { Auth } from 'aws-amplify';

export function useAuth(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [user, setUser] = useState();

  const signIn = useCallback(
    async (email, password) => {
      await Auth.signIn(email, password);
      const session = await Auth.currentSession();
      const jwtToken = session?.accessToken?.jwtToken;
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
      setAccessToken(jwtToken);
      setIsLoggedIn(true);
    },
    [setUser],
  );
  return {
    signIn,
    isLoggedIn,
    accessToken,
    user,
  };
}