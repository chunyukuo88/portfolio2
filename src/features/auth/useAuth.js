import React, { useCallback, useState } from 'react';
import { Auth } from 'aws-amplify';
import {useDispatch, useSelector} from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
  logout
} from './authSlice';

export function useAuth(){
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const signIn = async (email, password) => {
    await Auth.signIn(email, password);
    const session = await Auth.currentSession();
    const jwtToken = session?.accessToken?.jwtToken;
    const currentUser = await Auth.currentAuthenticatedUser();
    dispatch(setCredentials({
      user: currentUser,
      token: jwtToken,
    }));
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