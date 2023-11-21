import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

//import Ionicons from 'react-native-vector-icons/Ionicons'



export function Home() {
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

      <Text style={styles.textoHookCad}>
        Você não tem conta?{' '}
        <Text style={styles.linkText}>Cadastre-se</Text>
      </Text>

    </View>
  );
}