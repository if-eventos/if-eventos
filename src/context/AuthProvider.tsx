import {createContext, useEffect, useState} from 'react';
import AsyncStorage  from "@react-native-async-storage/async-storage";

import api from '../services/api';


interface IContexto{
  tokenState:string | null;
  idUser:string | null;
  logar: (email:string, password:string) => Promise<void>;
  deslogar: ()=> Promise<void>;
}

export const AuthContext = createContext({}as IContexto);


interface IProps{
  children:React.ReactNode;
}
export function AuthProviderContext({children}:IProps) {
  const [tokenState, setTokenState] = useState<string | null>(null);

  //Estado para guardar o id do usuário
  const [idUser, setIdUser] = useState<string | null>(null);

  async function logar(email:string, password:string){
    const dados = {
      email, password
    }
    try {
      const response = await api.post('/api/v1/user/signin',dados);
    
      const { token, userId } = response.data as {token:string, userId:string};
      console.log(token);
      console.log(userId);
      api.defaults.headers.common.Authorization =`Bearer ${token}`;
      
      await AsyncStorage.setItem('auth.token',token);
      setTokenState(token);
      await AsyncStorage.setItem('auth.id', userId.toString());
      setIdUser(userId);
  
    } catch (error) {
      console.log('error aqui',error);
    }   
  }
  async function deslogar(){
    setTokenState(null);
    setIdUser(null);
    await AsyncStorage.removeItem('auth.token');
    await AsyncStorage.removeItem('auth.id');
  }

  useEffect(() => {
    async function loadStorage(){
      const tokenStorage= await AsyncStorage.getItem('auth.token');
      const idStorage= await AsyncStorage.getItem('auth.id');
      if(tokenStorage && idStorage){
        api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
        setTokenState(tokenStorage);
        setIdUser(idStorage);
      }
    }
    loadStorage();
  },[]);

  return (
    <AuthContext.Provider value={{tokenState, idUser, logar, deslogar}}>
      {children}
    </AuthContext.Provider>
  )
}