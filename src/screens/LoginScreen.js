import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../context/ThemeProvider';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkMode } = useTheme();

  const handleLogin = () => {
    Alert.alert('Giriş Başarılı');
    setUsername('');
    setPassword('');
  };

  return (
    <MainLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
  style={{ flex: 1 }} 
  contentContainerStyle={[
    styles.container,
    { backgroundColor: isDarkMode ? '#000' : '#fff' },
  ]}
  keyboardShouldPersistTaps="handled"
>

          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
            Giriş Yap
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? '#fff' : '#000',
                backgroundColor: isDarkMode ? '#111' : '#fff',
                borderColor: isDarkMode ? '#333' : '#ccc',
              },
            ]}
            placeholder="Kullanıcı Adı"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={[
              styles.input,
              {
                color: isDarkMode ? '#fff' : '#000',
                backgroundColor: isDarkMode ? '#111' : '#fff',
                borderColor: isDarkMode ? '#333' : '#ccc',
              },
            ]}
            placeholder="Şifre"
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#d00000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
