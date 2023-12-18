import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { styles } from './styles';
import { useFocusEffect} from '@react-navigation/native';
import { Footer } from '../../components/Footer';
import fetchEventos from '../../services/fetchEventos';
import Evento from '../../components/Eventos';

interface Evento {
  key: string;
  nome: string;
  descricao: string;
  id: number;
  image: any;
  data_hora: string;
  categoria: string;
}


//função ListaEventos, e desestruturação do {eventos}, logo mais eventos:Evento[] será um array do tipo Evento 
//Teremos um parametro evento que será do tipo EVENTOO
const ListaEventos = ({ eventos }: { eventos: Evento[] }) => {
  //Aqui teremos um return da lista de eventos, usando a componentização <Evento item...>
  return (
    <FlatList
      data={eventos}
      horizontal
      renderItem={({ item }) => (
        <Evento item={item} /> 
      )}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

//Função home
export default function Home() {
  //Aqui declaramos arrays para as categorias de eventos que iremos mostrar na página home
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventosADS, setEventosADS] = useState<Evento[]>([]);
  const [eventosCivil, setEventosCivil] = useState<Evento[]>([]);
  const [eventosMatematica, setEventosMatematica] = useState<Evento[]>([]);
  const [eventosControle, setEventosControle] = useState<Evento[]>([]);
  const [isFocused, setIsFocused] = useState(false);


  //Quando a tela é focada ela renderiza a lógica e os eventos cadastrados

  useFocusEffect(() => {
    setIsFocused(true);

    return () => setIsFocused(false);
  });


  //Hook para carregar info dos eventos assincronos.
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

    //Aqui a função Load recebe mais um array e em seguida temos um if para comprar se a categoria é igual a 'ads', caso seja
    //esse novo array faz um push desse evento, por fim, o setEventosADS, nosso array principal, faz um set(eventosADSAr...) jogando assim
    //os dados do array da função load para o array da função home e tornando possível utilizar as informações fora da função.
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
          if(evento.categoria === 'engenharia-civil'){
            eventosCivilArray.push(evento);
          }
          setEventosCivil(eventosCivilArray);
        })
        
      } catch (error) {
        console.error('Erro ao carregar informações', error);
      }
    };

    const loadEventosMatematica = async () => {
      try {
        const eventosData = await fetchEventos();
        const eventosMatematicaArray: Evento[] = [];
        eventosData.forEach((evento)=>{
          if(evento.categoria === 'matematica'){
            eventosMatematicaArray.push(evento);
          }
          setEventosMatematica(eventosMatematicaArray);
        })
        
      } catch (error) {
        console.error('Erro ao carregar informações', error);
      }
    };

    const loadEventosControle = async () => {
      try {
        const eventosData = await fetchEventos();
        const eventosControleArray: Evento[] = [];
        eventosData.forEach((evento)=>{
          if(evento.categoria === 'controle-automacao'){
            eventosControleArray.push(evento);
          }
          setEventosControle(eventosControleArray);
        })
        
      } catch (error) {
        console.error('Erro ao carregar informações', error);
      }
    };

    //Quando nossa tela estiver em foco, carrega os eventos, toda vez que for montado ou alterado a função é chamada
    if (isFocused) {
      loadEventosAll();
      loadEventosADS();
      loadEventosCivil();
      loadEventosMatematica();
      loadEventosControle();
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
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Destaques</Text>
        </View>

        {/*Aqui usamos a função ListaEventos com o parametro eventos passando o array desejado */}
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventos} />
        </View>

        <View>
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, fontWeight: 'bold' }}>Análise e Desenvolvimento de Sistemas</Text>
        </View>

        {/*Aqui usamos a função ListaEventos com o parametro eventos passando o array desejado */}
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventosADS} />
        </View>

        <View>
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, fontWeight: 'bold' }}>Engenharia Civil </Text>
        </View>
        
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventosCivil} />
        </View>


        <View>
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, fontWeight: 'bold' }}>Matemática </Text>
        </View>
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventosMatematica} />
        </View>

        <View>
          <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 40, fontWeight: 'bold' }}>Controle de automação </Text>
        </View>
        <View style={styles.eventosEduc}>
          <ListaEventos eventos={eventosControle} />
        </View>

        <View style={styles.eventosEduc}>
        </View>
        
      </ScrollView>

      <Footer />
    </View>
  );
};
