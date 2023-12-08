import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './styles';

import { Footer } from '../../components/Footer';

const ListaHorizontalIcons = () => {
  const data = [
    { key: '1', label: 'Educação', iconName: 'graduation-cap' },
    { key: '2', label: 'Saúde', iconName: 'heartbeat' },
    { key: '3', label: 'Medicina', iconName: 'medkit' },
    { key: '4', label: 'Direito', iconName: 'balance-scale' },
    { key: '5', label: 'Programação', iconName: 'code'},
    { key: '6', label: 'Jornalismo', iconName: 'newspaper-o'},
    { key: '7', label: 'Esportes', iconName: 'bolt'}
  ];

  const renderItem = ({ item }) => (
    <View style={styles.opcao}>
      <Icon name={item.iconName} type='font-awesome' size={40} color='#517fa4' />
      <Text style={styles.opcaoTexto}>{item.label}</Text>
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
  const dataEventos = [
    { key: '1', nome: 'IV sertão comp - Cajazeiras-PB', data: 'quinta-feira 10/08/2024', image: require('./IF.png') },
    { key: '2', nome: 'Semana da educação e docência', data: 'terça-feira 02/09/2024', image: require('./educ.png') },
    { key: '3', nome: 'Educare - Congresso de Lingua Portuguesa', data: 'sexta-feira 12/10/2024', image: require('./educare.png') },
    { key: '4', nome: 'Saúde é da nossa conta', data: 'quarta-feira 02/03/2024', image: require('./saude.png') },
    { key: '5', nome: 'IV sertão comp - Cajazeiras-PB', data: 'quinta-feira 10/08/2024', image: require('./IF.png') },
    { key: '6', nome: 'Semana da educação e docência', data: 'terça-feira 02/05/2024', image: require('./educ.png') },
  ];
  
  const renderItemEvento = ({ item }) => (
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

export default function Home() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 20, marginTop: 40, fontWeight: 'bold'}}>Bem vindo(a)</Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginLeft: 20, color: '#3A3A3A' }}>Descubra novos eventos</Text>
      </View>

      <View>
        <ListaHorizontalIcons />
      </View>

      <View>
        <Text style={{textAlign: 'left', fontSize: 16, marginLeft: 40, marginTop: 60, fontWeight: 'bold' }}>Destaques</Text>
      </View>

      <View>
        <ListaHorizontalEventos />
      </View>


      <Footer />
    </View>
  );
};
