import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './styles';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
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
  categoria: string;
}

const ListaHorizontalIcons = () => {
  const data: Icons[] = [
    { key: '1', nome: 'Educação', iconName: 'graduation-cap' },
    { key: '2', nome: 'Saúde', iconName: 'heartbeat' },
    { key: '3', nome: 'Medicina', iconName: 'medkit' },
    { key: '4', nome: 'Direito', iconName: 'balance-scale' },
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


const ListaEventos = ({ eventos }: { eventos: Evento[] }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={eventos}
      horizontal
      renderItem={({ item }) => (
        
        <TouchableOpacity onPress={() => {
            //@ts-ignore
            navigation.navigate('DetalheEvento', { evento: item })}}>

          <View style={styles.renderEventos}>
            <Image source={{ uri: `${api.getUri()}${item.image}` }} style={styles.Image} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 5 }}>{item.nome}</Text>
            <Text style={{ fontSize: 12, color: '#3a3a3a' }}>Data do evento: {item.data_hora}</Text>
           
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};


export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventosADS, setEventosADS] = useState<Evento[]>([]);
  const [eventosCivil, setEventosCivil] = useState<Evento[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(() => {
    setIsFocused(true);

    return () => setIsFocused(false);
  });

  useEffect(() => {
    const loadEventosAll = async () => {
      try {
        const eventosData = await fetchEventos();
        setEventos(eventosData);
        //console.log('Eventos:', eventosData);
      } catch (error) {
        console.error('Erro ao carregar informações', error);
      }
    };

    const loadEventosADS = async () => {
      try {
        const eventosData = await fetchEventos();
        const eventosADSArray: Evento[] = [];
        eventosData.forEach((evento) => {
          if (evento.categoria === 'ads') {
            eventosADSArray.push(evento);
          }
        });
        setEventosADS(eventosADSArray);
      } catch (error) {
        console.error('Erro ao carregar informações', error);
      }
    };

    const loadEventosCivil = async () => {
      try {
        const eventosData = await fetchEventos();
        const eventosCivilArray: Evento[] = [];
        eventosData.forEach((evento)=>{
          if(evento.categoria == 'engenharia-civil'){
            eventosCivilArray.push(evento);
          }
          setEventosCivil(eventosCivilArray);
        })
        
      } catch (error) {
        console.error('Erro ao carregar informações', error);
      }
    };

    if (isFocused) {
      loadEventosAll();
      loadEventosADS();
      loadEventosCivil();
    }
  }, [isFocused]);
  

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
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Destaques</Text>
        </View>
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventos} />
        </View>

        <View>
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Análise e Desenvolvimento de Sistemas</Text>
        </View>
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventosADS} />
        </View>

        <View>
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Engenharia Civil </Text>
        </View>
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventosCivil} />
        </View>

        <View style={styles.eventosEduc}>
        </View>
        
      </ScrollView>

      <Footer />
    </View>
  );
};
