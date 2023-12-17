import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import userInfo from '../../services/userInfo';
import api from '../../services/api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';



export default function EditPerfil() {
  const { name, telefone, email, image } = userInfo();

  console.log('Dados do usuário:', { name, telefone, email, image });

  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(telefone);
  const [newEmail, setNewEmail] = useState(email);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const navigation = useNavigation();


  useEffect(() => {
    setNewName(name);
    setNewPhone(telefone);
    setNewEmail(email);
  }, [name, telefone, email]);



  const handleUpdateProfile = async () => {
    
    console.log(newName, newPhone, newEmail);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    try {
      const dataForm = new FormData();

      if(newName)  dataForm.append('name', newName);
      if(newPhone) dataForm.append('telefone', newPhone);
      if(newEmail) dataForm.append('email', newEmail);

      if (imagePath) {
        dataForm.append('image', {
          name: `imagehash.jpg`,
          type: 'image/jpg',
          uri: imagePath,
        } as any);
      }

      const response = await api.patch(`/api/v1/user/atualizarUser/`, dataForm, config);
      navigation.navigate('Home');

    } catch (error) {

      console.error('Erro ao atualizar perfil', error);
    }

}


  console.log('Estados iniciais:', { newName, newPhone, newEmail, imagePath });


  async function handleSelectImage() {
    // tenho acesso a galeria de fotos e não a câmera
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    /* console.log(status); */
    if (status !== 'granted') {// granted é quando o usuário deu permissão
      alert('Eita, precisamos de acesso às suas fotos...');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      // permite ao usuario editar a imagem (crop), antes de subir o app
      allowsEditing: true,
      quality: 1,
      aspect: [3, 3],
      //quero apensas imagems e não vídeo tb
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
    /* console.log(result); */
    if (!result.canceled) {
      setImagePath(result.assets[0].uri);
      console.log(imagePath);
    }
  }

  
  
return (
  <View style={styles.container}>
    <ScrollView>
      <Header pageName="Editar Perfil" descricao="Personalize seu perfil." />
      <View style={styles.user}>
        <View>
          <Text style={styles.editPerfilText}>Editar Perfil</Text>
        </View>

        <TouchableOpacity onPress={handleSelectImage}>
          {imagePath ? (
            <Image source={{ uri: imagePath }} style={styles.userImage} />
          ) : (
            <Image source={{ uri: api.getUri() + image }} style={styles.userImage} />
          )}
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Novo Nome"
            value={newName}
            onChangeText={(text) => setNewName(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Novo Telefone"
            value={newPhone}
            onChangeText={(text) => setNewPhone(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Novo Email"
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
          />
        </View>

        <TouchableOpacity onPress={handleUpdateProfile} style={styles.btnSalvar}>
          <Ionicons name="checkmark" size={20} color="white" />
          <Text style={{ color: 'white', textAlign: 'center', marginLeft: 5 }}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <Footer />
  </View>
);
}