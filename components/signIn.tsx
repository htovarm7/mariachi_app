import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { googleClientId } = Constants.expoConfig?.extra ?? {};
  const auth = getAuth();

  // Google Auth Session hook
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      setLoading(true);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert('Éxito', 'Has iniciado sesión con Google');
        })
        .catch(err => {
          Alert.alert('Error', err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [response]);

  const signInEmail = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', 'Has iniciado sesión correctamente');
    } catch (e: any) {
      Alert.alert('Error', 'Sign in failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button onPress={signInEmail} title={loading ? 'Cargando...' : 'Login'} disabled={loading} />
      <View style={{ marginVertical: 10 }} />
      <Button
        disabled={!request}
        title="Iniciar sesión con Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
  },
});
