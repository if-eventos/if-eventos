import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import api from '../../services/api';
import userInfo from "../../services/userInfo";





export default function Main() {
  const route = useRoute();
  //@ts-ignore
  const evento = route.params?.evento;

  if (!evento) {
    return (
      <View style={styles.container}>
        <Text>Evento não encontrado</Text>
      </View>
    );
  }

    const usuario = userInfo();

    const [participantes, setParticipantes] = useState<string[]>([]);

    const participarDoEvento = async (eventoIdev: string) => {
        try {
            console.log(evento.id);
            const novosParticipantes = [...participantes, usuario.name];
            const adc = await api.post(`/api/v1/ouvinte/adicionar/${usuario.id}`);
            const get = await api.get(`/api/v1/ouvinte/readAll/${evento.id}`);
            console.log(get.data['users']);
            setParticipantes(get.data['users']);
          } catch (error) {
            console.error('Erro na requisição:', error);
            console.error('Detalhes do erro:', error.response.data);
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

        <View style={{alignItems: 'center'}}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 5 }}>{evento.nome}</Text>
            <View style={styles.renderEventos}>
                <Image source={{ uri: `${api.getUri()}${evento.image}` }} style={styles.Image} />
                <Text style={{ fontSize: 16, color: 'black' }}>{evento.descricao}</Text>
                <Text style={{ fontSize: 12, color: '#3a3a3a' }}>Data do evento: {evento.data_hora}</Text>
                
            </View>
            <TouchableOpacity
                style={styles.participarButton}
                onPress={() => participarDoEvento(evento.nome)}
                >
                <Text style={{ color: 'black' }}>Participar do Evento</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      <Footer />
    </View>
  );
}