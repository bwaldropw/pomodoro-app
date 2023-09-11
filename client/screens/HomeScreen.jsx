import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firebaseService from '../services/firebase';

export default function HomeScreen() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    console.log('getting user');
    try {
      const token = await firebaseService.auth.currentUser.getIdToken(true);
      console.log(token);

      const req = await axios.get('http://localhost:5050/user', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(req.data);
      if (req.data) {
        setUser(req.data);
        setLoadingUser(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      {loadingUser ? <Text>Loading...</Text> : <Text>{user.email}</Text>}
    </View>
  );
}
