import {createContext, useEffect, useState} from 'react';
import AsyncStorage  from "@react-native-async-storage/async-storage";

import api from '../services/api';


interface IContexto{
  tokenState:string | null;
  logar: (email:string, password:string) => Promise<void>;
  deslogar: ()=> Promise<void>;
}

export const AuthContext = createContext({}as IContexto);


interface IProps{
  children:React.ReactNode;
}
export function AuthProviderContext({children}:IProps) {
  const [tokenState, setTokenState] = useState<string | null>(null);

  async function logar(email:string, password:string){
    const dados = {
      email, password
    }
    try {
      const response = await api.post('/api/v1/user/signin',dados);
    
      const { token } = response.data as {token:string};
      console.log(token);
      api.defaults.headers.common.Authorization =`Bearer ${token}`;
  
      await AsyncStorage.setItem('auth.token',token);
      setTokenState(token);
  
    } catch (error) {
      console.log('error aqui',error);
    }   
  }
  async function deslogar(){
    setTokenState(null);
    await AsyncStorage.removeItem('auth.token');
  }

  useEffect(() => {
    async function loadStorage(){
      const tokenStorage= await AsyncStorage.getItem('auth.token');
      if(tokenStorage){
        api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
        setTokenState(tokenStorage);
      }
    }
    loadStorage();
  },[]);

  return (
    <AuthContext.Provider value={{tokenState,logar,deslogar}}>
      {children}
    </AuthContext.Provider>
  )
}