import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';


import { useNavigation } from '@react-navigation/native';
import { Form } from '../../components/Form';


export default function Cadastro() {

  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>

          <View style={styles.imageView}>
            <Image
              source={require('../../images/IF.png')}
              style={styles.imagem}
            />
          </View>


          <Form navigation={navigation} />
        </ScrollView>

      </View>
  )
};