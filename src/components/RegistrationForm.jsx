import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function RegistrationForm({ onSignIn }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType] = useState('driver');
  const [agree, setAgree] = useState(false);

  // Backend connection: handle registration
  const handleRegister = async () => {
    // You may want to add validation here
    try {
      const response = await fetch('http://10.22.160.39:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          accountType: 'driver', // Always register as driver
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Registration successful, go to driver details page
        // You can replace this with navigation logic as per your app (e.g., using React Navigation)
        alert('Registration successful!');
        // // Example: navigate('DriverDetails', { user: data.user });
        // // For now, just show the details in an alert
        // alert(`Driver Registered:\nName: ${fullName}\nEmail: ${email}\nAccount Type: driver`);
        if (onSignIn) onSignIn();
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      alert('Error connecting to backend.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.centered} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Get started for track your order</Text>

          {/* Account Type Selection */}
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Account Type</Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <TouchableOpacity
                style={[styles.accountTypeBtn, true && styles.accountTypeBtnActive]} // Always active as driver
                onPress={() => {}}
              >
                <Text style={[styles.accountTypeBtnText, true && styles.accountTypeBtnTextActive]}>Driver</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Create a strong password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={styles.signInBtn} onPress={handleRegister}>
            <Text style={styles.signInBtnText}>Register →</Text>
          </TouchableOpacity>
          {/* Sign In Link */}
          <Text style={styles.createAccountText}>
            Already have an account?{' '}
            <Text style={styles.createAccountLink} onPress={onSignIn}>Sign in</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  accountTypeBtn: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  accountTypeBtnActive: {
    backgroundColor: '#a020f0',
    borderColor: '#a020f0',
  },
  accountTypeBtnText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 15,
  },
  accountTypeBtnTextActive: {
    color: '#fff',
  },
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
