
import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import DriverDashboard from './components/DriverDashboard';
import { LoginForm } from './components/AuthForms';
import RegistrationForm from './components/RegistrationForm';


const App = () => {
  const [token, setToken] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f9fb' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      {token ? (
        <DriverDashboard />
      ) : showRegister ? (
        <RegistrationForm onSignIn={() => setShowRegister(false)} />
      ) : (
        <LoginForm onLogin={setToken} onShowRegister={() => setShowRegister(true)} />
      )}
    </SafeAreaView>
  );
};

export default App;
