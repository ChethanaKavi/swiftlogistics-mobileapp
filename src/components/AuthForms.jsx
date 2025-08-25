
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';

const API_URL = 'http://10.22.160.39:3001/api'; // Change to your backend URL if needed

export function LoginForm({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Could not connect to server');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.centered} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>Firebase: Error ({error}).</Text>
            </View>
          ) : null}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR SIGN IN WITH EMAIL</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>
          <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
            <Text style={styles.signInBtnText}>Sign In →</Text>
          </TouchableOpacity>
          <Text style={styles.createAccountText}>
            Don't have an account?{' '}
            <Text style={styles.createAccountLink} onPress={onShowRegister}>Create account</Text>
          </Text>
          {/* */}
        </View>
        {/* <View style={styles.footer}>
          <Text style={styles.footerLink} onPress={() => Linking.openURL('#')}>Privacy Policy</Text>
          <Text style={styles.footerDot}>·</Text>
          <Text style={styles.footerLink} onPress={() => Linking.openURL('#')}>Terms of Service</Text>
          <Text style={styles.footerDot}>·</Text>
          <Text style={styles.footerLink} onPress={() => Linking.openURL('#')}>Help Center</Text>
        </View> */}
        {/* <Text style={styles.copyright}>© 2025 SwiftLogistics (Pvt) Ltd. All rights reserved.</Text> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Registration Successful', 'You can now log in.');
      } else {
        Alert.alert('Registration Failed', data.message || 'Error');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not connect to server');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fb',
    paddingVertical: 30,
  },
  card: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 18,
  },
  errorBox: {
    backgroundColor: '#ffeaea',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ffb3b3',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 15,
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#888',
    fontSize: 13,
  },
  inputBox: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
    marginLeft: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 10,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#222',
  },
  signInBtn: {
    backgroundColor: '#a020f0',
    borderRadius: 6,
    paddingVertical: 13,
    marginTop: 8,
    marginBottom: 8,
  },
  signInBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createAccountText: {
    textAlign: 'center',
    color: '#444',
    marginBottom: 10,
    fontSize: 14,
  },
  createAccountLink: {
    color: '#a020f0',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  dashboardBox: {
    backgroundColor: '#faf6ff',
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  dashboardTitle: {
    fontWeight: 'bold',
    color: '#a020f0',
    marginBottom: 8,
    fontSize: 15,
  },
  dashboardBtnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dashboardBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a020f0',
    borderRadius: 6,
    paddingVertical: 10,
    marginHorizontal: 4,
    marginTop: 2,
  },
  dashboardBtnText: {
    color: '#a020f0',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  footerLink: {
    color: '#888',
    fontSize: 13,
    marginHorizontal: 4,
    textDecorationLine: 'underline',
  },
  footerDot: {
    color: '#888',
    fontSize: 13,
    marginHorizontal: 2,
  },
  copyright: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
  },
});
