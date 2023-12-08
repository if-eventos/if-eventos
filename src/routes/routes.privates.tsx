import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import CriarEvento from '../screens/CriarEvento';


const {Navigator,Screen} = createNativeStackNavigator();

export function RoutesPrivadas(){
  
  return (

    <Navigator screenOptions={{headerShown:false}}>
          <Screen 
            name='CriarEvento' 
            component={CriarEvento}
          />
         
        </Navigator>
    
  );
}