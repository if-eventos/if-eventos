import { TouchableOpacity, View, Image, Text } from "react-native"
import api from "../../services/api"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native";

interface Evento {
    key: string;
    nome: string;
    descricao: string;
    id: number;
    image: any;
    data_hora: string;
    categoria: string;
  }

type Props= {
    item : Evento
}

export default function Evento ({item}:Props){
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => {
            //@ts-ignore
            navigation.navigate('DetalheEvento', { evento: item })}}>
    
          <View style={styles.renderEventos}>
            <Image source={{ uri: `${api.getUri()}${item.image}` }} style={styles.Image} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 5 }}>{item.nome}</Text>
            <Text style={{ fontSize: 12, color: '#3a3a3a' }}>Data do evento: {item.data_hora}</Text>
          </View>

    </TouchableOpacity>
    )
}