import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {Login} from '../screens/Login';
import {Cadastro} from '../screens/Cadastro';

const {Navigator,Screen} = createNativeStackNavigator();

export function AuthRoutes(){
    return (
      
        <Navigator screenOptions={{headerShown:false}}>
          <Screen 
            name='Login' 
            component={Login}
          />
          <Screen 
            name='Cadastro' 
            component={Cadastro}
          />
         
        </Navigator>
      
    );
  }