import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CriarEvento from '../screens/CadastroEvento/CriarEvento';
import SelectMapPosition from '../screens/CadastroEvento/SelectMapPosition';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import EditPerfil from '../screens/EditPerfil';
import DetalheEvento from '../screens/DetalheEvento'


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
        name='SelectMapPosition'
        component={SelectMapPosition}
      />
      <Screen
        name='Perfil'
        component={Perfil}
      />
      <Screen
        name='EditPerfil'
        component={EditPerfil}
      />
      <Screen
        name='DetalheEvento'
        component={DetalheEvento}
      />

    </Navigator>

  );
}