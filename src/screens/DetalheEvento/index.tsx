import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import api from '../../services/api';

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
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}