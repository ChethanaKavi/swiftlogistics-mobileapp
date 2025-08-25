

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function RegistrationForm({ onSignIn }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('Client');
  const [agree, setAgree] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.centered} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Get started for track your order</Text>

          {/* Full Name */}
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

          {/* Account Type */}
          <Text style={styles.inputLabel}>Account Type</Text>
          <View style={styles.accountTypeRow}>
            <TouchableOpacity
              style={[styles.accountTypeBtn, accountType === 'Client' && styles.accountTypeBtnActive]}
              onPress={() => setAccountType('Client')}
            >
              <Text style={[styles.accountTypeIcon, accountType === 'Client' && styles.accountTypeIconActive]}>👤</Text>
              <View>
                <Text style={[styles.accountTypeText, accountType === 'Client' && styles.accountTypeTextActive]}>Client</Text>
                <Text style={styles.accountTypeSub}>Process Order</Text>
              </View>
              {accountType === 'Client' && <Text style={styles.accountTypeCheck}>✔️</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.accountTypeBtn, accountType === 'Driver' && styles.accountTypeBtnActive]}
              onPress={() => setAccountType('Driver')}
            >
              <Text style={[styles.accountTypeIcon, accountType === 'Driver' && styles.accountTypeIconActive]}>💜</Text>
              <View>
                <Text style={[styles.accountTypeText, accountType === 'Driver' && styles.accountTypeTextActive]}>Driver</Text>
                <Text style={styles.accountTypeSub}>Take Orders</Text>
              </View>
              {accountType === 'Driver' && <Text style={styles.accountTypeCheck}>✔️</Text>}
            </TouchableOpacity>
          </View>

          {/* Terms Checkbox */}
          <View style={styles.termsRow}>
            <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.checkboxBox}>
              <View style={[styles.checkbox, agree && styles.checkboxChecked]}>{agree && <Text style={styles.checkboxTick}>✔️</Text>}</View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={[styles.createBtn, !(agree && fullName && email && password && confirmPassword && password === confirmPassword) && styles.createBtnDisabled]} disabled={!(agree && fullName && email && password && confirmPassword && password === confirmPassword)}>
            <Text style={styles.createBtnText}>Create Account</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink} onPress={onSignIn}>Sign in</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
