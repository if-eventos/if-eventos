import { FlatList, Text, TouchableOpacity, View, Image, ScrollView, SafeAreaView } from "react-native";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

import { styles } from "./styles";
import { Header } from "../../components/Header";
import Evento from "../../components/Eventos";


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
            <Header descricao="Eventos que você está participando:" pageName="Eventos inscritos" />

            <SafeAreaView style={styles.ContainerEventos}>

                    {
                    eventosInscritos.length > 0 
                    ?
                            <FlatList
                                data={eventosInscritos}
                                renderItem={({ item }) => (

                                    <Evento item={item} />
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