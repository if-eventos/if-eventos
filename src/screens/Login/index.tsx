import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

import { useNavigation } from '@react-navigation/native';

//import Ionicons from 'react-native-vector-icons/Ionicons'

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

 
  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/IF.png')}
        style={styles.imagem}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu email..."
        value={emailUser}
        onChangeText={(c) => {
          setEmailUser(c)
        }}
      />


      <TextInput
        style={styles.input}
        placeholder="*********"
      />
      <TouchableOpacity
        style={styles.button}
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