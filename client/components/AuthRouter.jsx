import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import ScreenNavigation from '../navigation/ScreenNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import firebaseService from '../services/firebase';
import LoginScreen from '../screens/LoginScreen'

export default function AuthRouter() {
  const [loading, setLoading] = useState(true);
  const authorized = useStoreState((state) => state.authorized);
  const setAuthorized = useStoreActions((actions) => actions.setAuthorized);
  const setUnauthorized = useStoreActions((actions) => actions.setUnauthorized);

  const authStateListener = () => {
    firebaseService.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return setUnauthorized();
      }

      setLoading(false);
      return setAuthorized();
    });
  };

  useEffect(() => {
    authStateListener();
  }, [authStateListener]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : authorized ? (
        <ScreenNavigation />
      ) : (
        <LoginScreen />
      )}
    </>
  );
}