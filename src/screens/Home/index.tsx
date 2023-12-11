import React from 'react';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './styles';

import { Footer } from '../../components/Footer';

interface Props {
  key: string;
  nome: string;
  data: string;
  image: any;
}

interface Icons {
  key: string;
  nome: string;
  iconName: string;
}


const ListaHorizontalIcons = () => {
  const data: Icons[] = [
    { key: '1', nome: 'Educação', iconName: 'graduation-cap' },
    { key: '2', nome: 'Saúde', iconName: 'heartbeat' },
    { key: '3', nome: 'Medicina', iconName: 'medkit' },
    { key: '4', nome: 'Direito', iconName: 'balance-scale' },
    { key: '5', nome: 'Programação', iconName: 'code'},
    { key: '6', nome: 'Jornalismo', iconName: 'newspaper-o'},
    { key: '7', nome: 'Esportes', iconName: 'bolt'}
  ];

  const renderItem = ({ item }: {item:Icons}) => (
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

const ListaHorizontalEventos = () => {
  const dataEventos : Props[] =[
    { key: '1', nome: 'IV sertão comp - Cajazeiras-PB', data: 'quinta-feira 10/08/2024', image: require('./images/IF.png') },
    { key: '2', nome: 'Semana da educação e docência', data: 'terça-feira 02/09/2024', image: require('./images/educ.png') },
    { key: '3', nome: 'Educare - Congresso de Lingua Portuguesa', data: 'sexta-feira 12/10/2024', image: require('./images/educare.png') },
    { key: '4', nome: 'Saúde é da nossa conta', data: 'quarta-feira 02/03/2024', image: require('./images/saude.png') },
    { key: '5', nome: 'IV sertão comp - Cajazeiras-PB', data: 'quinta-feira 10/08/2024', image: require('./images/IF.png') },
    { key: '6', nome: 'Semana da educação e docência', data: 'terça-feira 02/05/2024', image: require('./images/educ.png') },
  ];


  const renderItemEvento = ({ item } : {item:Props}) => (
    <View style= {styles.opcaoEventos}>
      <Image source={item.image} style= {styles.Imagem}/>
      <Text style={{fontSize: 12, fontWeight: 'bold', marginLeft: 10, marginTop: 5}}>{item.nome}</Text>
      <Text style={{fontSize: 12, marginLeft: 10}}>{item.data}</Text>
    </View>
  );

  return (
    <FlatList
      data={dataEventos}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItemEvento}
      keyExtractor={item => item.key}
      style={{ marginLeft: 40 }}
    />
  );
};


const ListaEventosEducacao = () => {
  const dataEventos: Props[] = [
    { key: '1', nome: 'IV sertão comp - Cajazeiras-PB', data: 'quinta-feira 10/08/2024', image: require('./images/IF.png') },
    { key: '2', nome: 'Semana da educação e docência', data: 'terça-feira 02/09/2024', image: require('./images/educ.png') },
    { key: '3', nome: 'Educare - Congresso de Língua Portuguesa', data: 'sexta-feira 12/10/2024', image: require('./images/educare.png') },
    { key: '4', nome: 'Semana da educação e docência', data: 'terça-feira 02/05/2024', image: require('./images/educ.png') },
  ];

  const renderItemEvento = ({ item }: { item: Props}) => (
    <View style={styles.opcaoEventos}>
      <Image source={item.image} style={styles.Imagem} />
      <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 10, marginTop: 5 }}>{item.nome}</Text>
      <Text style={{ fontSize: 12, marginLeft: 10 }}>{item.data}</Text>
    </View>
  );

  return (
    <FlatList
      data={dataEventos}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItemEvento}
      keyExtractor={item => item.key}
      style={{ marginLeft: 40 }}
    />
  );
};


export default function Home() {
  return (
    <View style={styles.container}>
      <View style={{height:90}}>
        <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 20, marginTop: 40, fontWeight: 'bold'}}>Bem vindo(a)</Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginLeft: 20, color: '#3A3A3A' }}>Descubra novos eventos</Text>
      </View>

      <ScrollView>
        <View>
          <ListaHorizontalIcons />
        </View>

        <View>
          <Text style={{textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Destaques</Text>
        </View>

        <View>
          <ListaHorizontalEventos />
        </View>

        <View>
          <Text style={{textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Educação</Text>
        </View>

        <View>
          <ListaEventosEducacao />
        </View>

        <View>
          <Text style={{textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Educação</Text>
        </View>

        <View style={{marginBottom: 100}}>
          <ListaEventosEducacao />
        </View>

      </ScrollView>
      
      <Footer />
    </View>
  );
};
