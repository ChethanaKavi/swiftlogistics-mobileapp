import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import DriverDashboard from './components/DriverDashboard';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f9fb' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      <DriverDashboard />
    </SafeAreaView>
  );
};

export default App;
