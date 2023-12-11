
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { styles } from "./styles"
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useAuth } from "../../hooks/useAuth";



export default function CriarEvento() {

    const { deslogar } = useAuth();

    const handleLogout = () => {
        deslogar();
        console.log('Logout');
     };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Header pageName="Editar Perfil" descricao="" />

                <View style={styles.user}>
                    <Image
                        source={require('./images/IF.png')}
                        style={{ width: 82, height: 80, borderRadius: 80, marginRight: 10, borderWidth: 1, borderColor: 'black' }}
                    />
                    
                    <Text>Cancelar</Text>
                    <Text>Salvar</Text>
                </View>
            </ScrollView>
            
            <Footer />
        </View>
    )
}