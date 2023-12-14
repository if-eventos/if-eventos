import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';


interface ParamsEmail {
  email: string
}


export function Login() {

  const { logar } = useAuth();
  
  const [emailUser, setEmailUser] = useState<string>("");
  const [passwordUser, setPasswordUser] = useState<string>("");

  const navigation = useNavigation(); //Realizar navegação
  const route = useRoute();           //Capturar parâmetros do navegation

  //este useEffect é chamado sempre que um parametro é recebido
  useEffect(() => {
    if (route.params) {
      const { email } = route.params as ParamsEmail; //vai tratar o route.params como um tipo específico
      setEmailUser(email)
    }
  }, [route.params]);

  const [errorAutenticarNovoUsuario, setErrorAutenticarNovoUsuario] = useState(false);



  async function handleUserAuthentication() {

    try {
      if (!emailUser || !passwordUser) {
        setErrorAutenticarNovoUsuario(true)
        console.error("Dados inválidos fornecidos");
        return;
      }

      const data = { email: emailUser, password: passwordUser };
      console.log(data);
      await logar(data.email, data.password);

      console.log("Usuário autenticado com sucesso");
      navigation.navigate('Home');
      return;

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
        placeholder="Senha"
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