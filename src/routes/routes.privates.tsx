import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CriarEvento from '../screens/CriarEvento';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import EditPerfil from '../screens/EditPerfil';


const { Navigator, Screen } = createNativeStackNavigator();

export function RoutesPrivadas() {

  return (

    <Navigator screenOptions={{ headerShown: false }}>
      
      <Screen
        name='Home'
        component={Home}
      />
      <Screen
        name='CriarEvento'
        component={CriarEvento}
      />
      <Screen
        name='Perfil'
        component={Perfil}
      />
      <Screen
        name='EditPerfil'
        component={EditPerfil}
      />

    </Navigator>

  );
}