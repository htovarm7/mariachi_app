import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (!email || !password || !name || !birthDate) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      Alert.alert('Éxito', 'Cuenta creada. Revisa tu email para verificación.');
    } catch (error: any) {
      Alert.alert('Error', 'Registro fallido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Fecha de nacimiento (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />
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
      <Button onPress={signUp} title={loading ? 'Cargando...' : 'Crear cuenta'} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    gap: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
  },
});

export default SignUp;
