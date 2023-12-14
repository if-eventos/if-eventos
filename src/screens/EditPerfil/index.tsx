import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import userInfo from '../../services/userInfo';
import api from '../../services/api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';


const InfoUser: React.FC = () => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [imagePath, setImagePath] = useState<string>();
  const Usuario = userInfo();
  const navigation = useNavigation();

  async function handleSelectImage() {
    // tenho acesso a galeria de fotos e não a câmera
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    /* console.log(status); */
    if(status !== 'granted'){// granted é quando o usuário deu permissão
      alert('Eita, precisamos de acesso às suas fotos...');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      // permite ao usuario editar a imagem (crop), antes de subir o app
      allowsEditing: true,
      quality: 1,
      aspect: [5, 3],
      //quero apensas imagems e não vídeo tb
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    /* console.log(result); */
    if(!result.canceled) { 
      setImagePath(result.assets[0].uri);
      console.log(imagePath);
    }
  }

  const handleUpdateProfile = async () => {

    console.log(newName, newPhone, newEmail);

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    try {
        const dataForm = new FormData();

        dataForm.append('name', newName);
        dataForm.append('telefone', newPhone);
        dataForm.append('email', newEmail);

        if(imagePath) {
            dataForm.append('image', {
                    name: `imagehash.jpg`,
                    type: 'image/jpg',
                    uri: imagePath,
                } as any);
            }else{
                dataForm.append('image', {
                    name: `imagehash.jpg`,
                    type: 'image/jpg',
                    uri: `${api.getUri()}${Usuario.image}`
                } as any)
            }
        const response = await api.patch(`/api/v1/user/atualizarUser/`, dataForm, config);
        navigation.navigate('Perfil');
        
    } catch (error) {

        console.error('Erro ao atualizar perfil', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header pageName="Editar Perfil" descricao="Personalize seu perfil." />
        <View style={styles.user}>
          <View>
            <Text style={styles.editPerfilText}>Editar Perfil</Text>
          </View>
          <Image source={{ uri: `${api.getUri()}${Usuario.image}` }} style={styles.userImage} />
          <TextInput
            placeholder="Novo Nome"
            value={newName}
            onChangeText={(text) => setNewName(text)}
          />
          <TextInput
            placeholder="Novo Telefone"
            value={newPhone}
            onChangeText={(text) => setNewPhone(text)}
          />
          <TextInput
            placeholder="Novo Email"
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
          />
          
          <View style={styles.ProfilePhoto}>
                            <TouchableOpacity
                                style={styles.profile}
                                onPress={handleSelectImage}
                            >
                                {
                                    imagePath ?
                                        <Image source={{uri: imagePath, width: 270, height: 150}} />
                                    : 
                                    <Image source={{ uri: `${api.getUri()}${Usuario.image}` }} />
                                
                                }
                            </TouchableOpacity>
                        </View>

          <TouchableOpacity onPress={handleUpdateProfile}>
            <Ionicons name="checkmark" size={20} color="green" />
            <Text style={{ color: 'green', marginLeft: 5 }}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default InfoUser;
