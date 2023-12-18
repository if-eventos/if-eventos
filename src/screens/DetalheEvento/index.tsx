import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import api from '../../services/api';

export default function Main() {
  const route = useRoute();
  //@ts-ignore
  const evento = route.params?.evento;

  //Caso não tenha um evento válido, mostrará a mensagem de erro.
  if (!evento) {
    return (
      <View style={styles.container}>
        <Text>Evento não encontrado</Text>
      </View>
    );
  }

  const [participantes, setParticipantes] = useState<string[]>([]);


  //O useEffect vai ser utilizado aqui para sempre carregar os usuários sem a necessidade de um evento do usuário.
  useEffect(() => {
    const carregarParticipantes = async () => {
      try {
        // Obter participantes do evento
        const response = await api.get(`/api/v1/ouvinte/readAll/${evento.id}`);
        const users = response.data['user']; //vai atribuir os usuarios a users

        //Aqui ele vai verificar se o array é de fato um array :D
        if (Array.isArray(users)) {
          setParticipantes(users);
          console.log('Participantes carregados:', users);
        } else {
          console.error('Resposta da API não contém a propriedade "user" ou não é um array:', response.data);
        }
      } catch (error) {
        console.error('Erro ao obter participantes:', error);
      }
    };

    carregarParticipantes();
  }, [evento.id]); //chama o carregarParti..() sempre que o evento.id é alterado

  const participarDoEvento = async () => {
    try {

      // Adiciona o usuario no evento desejado
      await api.post(`/api/v1/ouvinte/adicionar/${evento.id}`);

      // Atualiza a lista de participantes depois do cara clicar em participar do evento
      const response = await api.get(`/api/v1/ouvinte/readAll/${evento.id}`);
      const users = response.data['user'];

      //Aqui ele vai verificar se o array é de fato um array :D
      if (Array.isArray(users)) {
        setParticipantes(users);
        console.log('Participantes após inscrição:', users);
      } else {
        console.error('error:', response.data);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };


  const sairDoEvento = async () => {
    try {
      // Remove o usuario do evento desejado
      await api.delete(`/api/v1/ouvinte/deletar/${evento.id}`);

      // Atualiza a lista de participantes depois do cara clicar em sair do evento
      const response = await api.get(`/api/v1/ouvinte/readAll/${evento.id}`);
      const users = response.data['user'];

      //Aqui ele vai verificar se o array é de fato um array :D
      if (Array.isArray(users)) {
        setParticipantes(users);
        console.log('Participantes após sair do evento:', users);
      } else {
        console.error('error:', response.data);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header pageName="Detalhes do Evento" descricao="Visualize os detalhes do evento." />

        <View style={styles.user}>
          <View style={{ marginTop: 15, marginLeft: 5 }}>
          </View>
        </View>


        {/* Vai renderizar os eventos que o usuário clicou na página home*/}
        <View style={{alignItems: 'center'}}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 5 }}>{evento.nome}</Text>
          <View style={styles.renderEventos}>
            <Image source={{ uri: `${api.getUri()}${evento.image}` }} style={styles.Image} />
            <Text style={{ fontSize: 16, color: 'black' }}>{evento.descricao}</Text>
            <Text style={{ fontSize: 12, color: '#3a3a3a' }}>Data do evento: {evento.data_hora}</Text>
          </View>


          <View style={{flexDirection: 'row', margin: 5}}>
             {/* botão que chama a lógica do participar evento */}
            <TouchableOpacity
              style={styles.participarButton}
              onPress={participarDoEvento}>
              <Text style={{ color: 'black' }}>Participar do Evento</Text>
            </TouchableOpacity>

            {/* botão que chama a lógica de sair do evento */}
            <TouchableOpacity
              style={styles.participarButton}
              onPress={sairDoEvento}>
              <Text style={{ color: 'black' }}>Sair do Evento</Text>
            </TouchableOpacity>

          </View>
         
          {/* Mostrar a lista de participantes */}
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, alignSelf: 'baseline', marginLeft: 40}}>Participantes:</Text>
          {participantes && participantes.map((participante, index) => (
            <Text key={index} style={{alignSelf: 'baseline', marginLeft: 45}}>
              {/*@ts-ignore*/}
              {participante.name}
            </Text>
          ))}

          
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
