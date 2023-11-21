import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

//import Ionicons from 'react-native-vector-icons/Ionicons'



export function Login({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
        source={require('../../images/IF.png')}
        style={styles.imagem}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite aqui"
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

      <TouchableOpacity onPress={ () => navigation.navigate("Cadastro")}>
        <Text style={styles.textoHookCad}>
            Você já possui uma conta?{' '}<Text style={styles.linkText}>Sing-in</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Login;