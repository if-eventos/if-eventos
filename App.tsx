// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Cadastro from './src/screens/Cadastro';
import Login from './src/screens/Login';
import CriarEvento from './src/screens/CriarEvento';

import { AuthProviderContext } from './src/context/AuthProvider';
import { Routes } from './src/routes';

const Stack = createStackNavigator()

const App = () => {
  return (

    <AuthProviderContext>

      <Routes />

    </AuthProviderContext>
  );
};

export default App;
