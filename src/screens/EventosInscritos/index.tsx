import { FlatList, Text, TouchableOpacity, View, Image, ScrollView, SafeAreaView } from "react-native";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

import { styles } from "./styles";
import { Header } from "../../components/Header";


interface Evento {
    key: string;
    nome: string;
    descricao: string;
    id: number;
    image: any;
    data_hora: string;
    categoria: string;
}


export function EventosInscritos() {

    const navigation = useNavigation();

    const [eventosInscritos, setEventosInscritos] = useState<Evento[]>([]);

    useEffect(() => {
        const getEventos = async () => {
            const response = await api.get('/api/v1/evento/inscritos/');
            setEventosInscritos(response.data["eventos"]);
        }
        getEventos();
    }, []);


    return (

        <View style={styles.Container}>
            <Header descricao="Eventos que você está participando:" pageName="Eventos participando" />

            <SafeAreaView style={styles.ContainerEventos}>

                    {
                    eventosInscritos.length > 0 
                    ?
                            <FlatList
                                data={eventosInscritos}
                                renderItem={({ item }) => (

                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('DetalheEvento', { evento: item })
                                    }}>

                                        <View style={styles.renderEventos}>
                                            <Image source={{ uri: `${api.getUri()}${item.image}` }} style={styles.Image} />
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 5 }}>{item.nome}</Text>
                                            <Text style={{ fontSize: 12, color: '#3a3a3a' }}>Data do evento: {item.data_hora}</Text>

                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                showsVerticalScrollIndicator={true}

                            />
                        :
                        <Text>Você não está participando de nenhum evento.</Text>
                    }
                
            </SafeAreaView>

        </View>
    );
}