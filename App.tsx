// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Cadastro from './src/screens/Cadastro';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
