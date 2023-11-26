import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Cadastro({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
        source={require('../../images/IF.png')}
        style={styles.imagem}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu email..."
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

      <TouchableOpacity onPress={ () => navigation.navigate("Login")}>
        <Text style={styles.textoHookCad}>
          Voê não tem conta?{' '}<Text style={styles.linkText}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>

      

    </View>
  )
};