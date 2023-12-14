import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api";




export default function userInfo() {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', image: '', telefone: '' , id: ''});

    useEffect(() => {
      async function loadUserInfo() {
        try {
          const tokenStorage = await AsyncStorage.getItem('auth.token');
          const idStorage = await AsyncStorage.getItem('auth.id');

          if (tokenStorage && idStorage) {
            const response = await api.get(`/api/v1/user/${idStorage}`);
            const { name, email, image, telefone, id } = response.data.user;
            console.log(image);
            setUserInfo({ name, email, image, telefone, id });
          }
        } catch (error) {
          console.error('Erro ao carregar informações do usuário', error);
        }
      }

      loadUserInfo();
    }, []);

    return userInfo;
}