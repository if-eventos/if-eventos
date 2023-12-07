import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { ErrorMessage } from '../../components/ErrorMessage';


type Props = {
  route?: { params?: { email?: string } };
};


export function Login({ route }: Props) {

  const navigation = useNavigation();

  const [emailUser, setEmailUser] = useState<string>(() => {
    if (route && route.params && route.params.email) {
      return route.params.email;
    } else {
      return "";
    }
  });
  const [passwordUser, setPasswordUser] = useState<string>("");
  const [errorAutenticarNovoUsuario, setErrorAutenticarNovoUsuario] = useState(false);



  async function handleUserAuthentication() {

    try {
      if (!emailUser || !passwordUser) {
        setErrorAutenticarNovoUsuario(true)
        console.error("Dados inválidos fornecidos");
        return;
      }

      const data = { email: emailUser, password: passwordUser };

      const response = await api.post('/api/v1/user/signin', data);

      if (response.status === 200) {
        setErrorAutenticarNovoUsuario(false);
        navigation.navigate('Cadastro'); 
        console.log("Usuário autenticado com sucesso");
        return;
      } else {
        setErrorAutenticarNovoUsuario(true)
        console.log("Não foi possível autenticar o usuário");
        return;
      }
    } catch (err) {
      setErrorAutenticarNovoUsuario(true)
      console.log("Algum erro aconteceu ao autenticar o usuário", err);
    }
  }





  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/IF.png')}
        style={styles.imagem}
      />

      {
        errorAutenticarNovoUsuario ? <ErrorMessage description={"Falha ao autenticar"} /> : <></>
      }
      <TextInput
        style={styles.input}
        placeholder="Seu email..."
        value={emailUser}
        keyboardType="email-address"
        onChangeText={(c) => {
          setEmailUser(c)
        }}
      />


      <TextInput
        style={styles.input}
        placeholder="*********"
        value={passwordUser}
        onChangeText={(c) => {
          setPasswordUser(c)
        }}
        secureTextEntry
      />


      <TouchableOpacity
        style={styles.button}
        onPress={handleUserAuthentication}
      >
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.textoHookCad}>
          Não possui uma conta?{' '}<Text style={styles.linkText}>Sign-up</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Login;