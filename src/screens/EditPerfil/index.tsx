import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import userInfo from '../../services/userInfo';
import api from '../../services/api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { styles } from './styles';
import * as ImagePicker from 'expo-image-picker';



export default function EditPerfil() {
  //Vou pegar os dados do usuário que está logado através do userInfo()
  const { name, telefone, email, image } = userInfo();

  console.log('Dados do usuário:', { name, telefone, email, image });

  //Aqui vou setar os arrays e usar o useState passando o name do usuário. Isso servirá para jogar os dados no InputText
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(telefone);
  const [newEmail, setNewEmail] = useState(email);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const navigation = useNavigation();

  //Uso isso para atualizar os dados do usuário para os paramêtros que mandei no useState
  useEffect(() => {
    setNewName(name);
    setNewPhone(telefone);
    setNewEmail(email);
  }, [name, telefone, email]);


  //Função para atualizar as informações do usuário
  const handleUpdateProfile = async () => {
    
    console.log(newName, newPhone, newEmail);


    //
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

      //uso uma rota para atualizar o usuário passando o DataForm no códido anterior e o config
      const response = await api.patch(`/api/v1/user/atualizarUser/`, dataForm, config);
      navigation.navigate('Home');
      
    } catch (error) {

      console.error('Erro ao atualizar perfil', error);
    }

}

  //console para verificar se os estados iniciais estão funcionando corretamente
  console.log('Estados iniciais:', { newName, newPhone, newEmail, imagePath });


  async function handleSelectImage() {
    // obter acesso a GALERIAAA de fotos 
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // verificar se o usuário permite o acesso. Granted é quando o usuário deu permissão
    if (status !== 'granted') {
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