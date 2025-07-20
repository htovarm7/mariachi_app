import 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function SignIn() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<import('firebase/auth').User | null>(null);

  function handleAuthStateChanged(user: import('firebase/auth').User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}