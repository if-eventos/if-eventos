import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './styles';

import { Footer } from '../../components/Footer';
import fetchEventos from '../../services/fetchEventos';
import api from '../../services/api';

interface Icons {
  key: string;
  nome: string;
  iconName: string;
}

interface Evento {
  key: string;
  nome: string;
  descricao: string;
  id: number;
  image: any;
  data_hora: string;
}

const ListaHorizontalIcons = () => {
  const data: Icons[] = [
    { key: '1', nome: 'Educação', iconName: 'graduation-cap' },
    { key: '2', nome: 'Saúde', iconName: 'heartbeat' },
    { key: '3', nome: 'Medicina', iconName: 'medkit' },
    { key: '4', nome: 'Direito', iconName: 'balance-scale' },
    { key: '5', nome: 'Programação', iconName: 'code' },
    { key: '6', nome: 'Jornalismo', iconName: 'newspaper-o' },
    { key: '7', nome: 'Esportes', iconName: 'bolt' }
  ];

  const renderItem = ({ item }: { item: Icons }) => (
    <View style={styles.opcao}>
      <Icon name={item.iconName} type='font-awesome' size={40} color='#517fa4' />
      <Text style={styles.opcaoTexto}>{item.nome}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.key}
    />
  );
};


const ListaEventosEducacao = ({ eventos }: { eventos: Evento[] }) => {

  return (
    <FlatList
      data={eventos}
      horizontal
      renderItem={({ item }) => {
        console.log('Item:', item);
        console.log('Caminho da Imagem:', item.image);
        console.log('URL Completa:', `${api.getUri()}/imgs/events/${item.image}`);
        return (
          <View style={styles.renderEventos}>
            <Image source={{ uri: `${api.getUri()}/${item.image}` }} style={styles.Image} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 5 }}>{item.nome}</Text>
            <Text style={{ fontSize: 16, color: 'black' }}>{item.descricao}</Text>
            <Text style={{ fontSize: 12, color: '#3a3a3a' }}>Data do evento: {item.data_hora}</Text>
          </View>
        );
      }}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
}


export default function Home (){
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const loadEventos = async () => {
      try {
        const eventosData = await fetchEventos();
        setEventos(eventosData);
        console.log('Eventos:', eventosData);
      } catch (error) {
        console.error('Erro ao carregar informações', error);
      }
    };

    loadEventos();
  }, [fetchEventos]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 20, marginTop: 40, fontWeight: 'bold' }}>Bem vindo(a)</Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginLeft: 20, color: '#3A3A3A' }}>Descubra novos eventos</Text>
      </View>

      <ScrollView>
        <View>
          <ListaHorizontalIcons />
        </View>

        <View>
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Educação</Text>
        </View>

        <View style={styles.eventosEduc}>
          <ListaEventosEducacao eventos={eventos} />
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};
