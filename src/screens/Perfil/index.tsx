import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { styles } from "./styles"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import userInfo from "../../services/userInfo"
import api from '../../services/api';
import React from "react"

interface User1 {
    name: string;
    email: string;
    image: string;
    telefone: string;
    id: string;
  }


export default function Main() {
    //Aqui tenho uma variável usuário que pega os dados do usuário que está logado

    const usuario = userInfo();

    const navigation = useNavigation();


    //Aqui declaro a variavel deslogar com a função de deslogar
    const { deslogar} = useAuth();
    const handleLogout = () => {

        deslogar()
     };

     
    return (
        <View style={styles.container}>
            <ScrollView>
                <Header pageName="Meu perfil" descricao="Personalize seu perfil." />

                <View style={styles.user}>
                    {/* Aqui chamo o Image e pego a url da imagem que ficará salva no banco e renderizo pro usuário*/}
                    <Image
                        source={{ uri: `${api.getUri()}${usuario.image}` }}
                        style={{ width: 82, height: 80, borderRadius: 80, marginRight: 10, borderWidth: 1, borderColor: 'black' }}
                    />
                    <View style={{marginTop: 15, marginLeft: 5}}>
                        <Text style={{ fontWeight: 'bold', width:190 }}>{usuario.name}</Text>
                        <Text style={{ color: 'gray'}}>{usuario.email}</Text>
                    </View>

                </View>

                {/* Botão para navegar há tela de EditPerfil*/}
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditPerfil")}>
                        <Ionicons 
                            name="settings" 
                            size={20}
                            color="black"  
                            style={styles.icon}  
                        />
                        <Text style={styles.editar}>Editar</Text>
                    </TouchableOpacity>
                </View>


                {/* Botão para fazer logout*/}
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Ionicons name="log-out" size={20} color="red" style={styles.icon} />
                    <Text style={{color:'red', marginLeft:5 }}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
            
            <Footer />
        </View>
    )
}