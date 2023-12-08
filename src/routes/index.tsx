import {NavigationContainer} from '@react-navigation/native';
import {AuthRoutes} from './routes.publics';
import {RoutesPrivadas} from './routes.privates';
import {useAuth} from '../hooks/useAuth';

export function Routes(){
  const {tokenState} = useAuth();
  
  return (
    <NavigationContainer>
      {
        !!tokenState ? <RoutesPrivadas /> : <AuthRoutes />
      }
    </NavigationContainer>
  );
}