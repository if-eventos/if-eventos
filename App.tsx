// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProviderContext } from './src/context/AuthProvider';
import { Routes } from './src/routes';


const App = () => {
  return (

    <AuthProviderContext>

      <Routes />

    </AuthProviderContext>
  );
};

export default App;
