import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface IContexto {
  tokenState: string | null;
  idUser: string | null;
  logar: (email: string, password: string) => Promise<void>;
  deslogar: () => Promise<void>;
  useUserInfo: () => { name: string; email: string };
  fetchEventos: () => Promise<Evento[]>;
}

interface Evento {
  key: string;
  nome: string;
  descricao: string;
  id: number;
}

export const AuthContext = createContext({} as IContexto);

interface IProps {
  children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [idUser, setIdUser] = useState<string | null>(null);

  async function logar(email: string, password: string) {
    const dados = {
      email,
      password,
    };

    try {
      const response = await api.post('/api/v1/user/signin', dados);

      const { token, userId } = response.data as { token: string; userId: string };
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      await AsyncStorage.setItem('auth.token', token);
      setTokenState(token);
      await AsyncStorage.setItem('auth.id', userId.toString());
      setIdUser(userId);
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  }

  async function deslogar() {
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
  



  function useUserInfo() {
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });

    useEffect(() => {
      async function loadUserInfo() {
        try {
          const tokenStorage = await AsyncStorage.getItem('auth.token');
          const idStorage = await AsyncStorage.getItem('auth.id');

          if (tokenStorage && idStorage) {
            api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;

            const response = await api.get(`/api/v1/user/${idStorage}`);
            const { name, email } = response.data.user;
            setUserInfo({ name, email });
          }
        } catch (error) {
          console.error('Erro ao carregar informações do usuário', error);
        }
      }

      loadUserInfo();
    }, []);

    return userInfo;
  }

  async function fetchEventos(): Promise<Evento[]> {
    try {
      const response = await api.get('/api/v1/evento/todos');
      return response.data as Evento[];
    } catch (error) {
      console.error('Erro ao buscar eventos', error);
      throw error;
    }
  }
  

  return (
    <AuthContext.Provider value={{ tokenState, idUser, logar, deslogar, useUserInfo, fetchEventos }}>
      {children}
    </AuthContext.Provider>
  );
}
