import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api";




export default function userInfo() {
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });

    useEffect(() => {
      async function loadUserInfo() {
        try {
          const tokenStorage = await AsyncStorage.getItem('auth.token');
          const idStorage = await AsyncStorage.getItem('auth.id');

          if (tokenStorage && idStorage) {
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