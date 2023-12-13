
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { styles } from "./styles"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";



export default function Logout() {

    const {useUserInfo} = useAuth();
    const usuario = useUserInfo();

    const navigation = useNavigation();


    const { deslogar} = useAuth();

    const handleLogout = () => {
        deslogar();
     };

    

    return (
        <View style={styles.container}>
            <ScrollView>
                <Header pageName="Meu perfil" descricao="Personalize seu perfil." />

                <View style={styles.user}>
                    <Image
                        source={require('./images/IF.png')}
                        style={{ width: 82, height: 80, borderRadius: 80, marginRight: 10, borderWidth: 1, borderColor: 'black' }}
                    />
                    <View style={{marginTop: 15, marginLeft: 5}}>
                        <Text style={{ fontWeight: 'bold', width:190 }}>{usuario.name}</Text>
                        <Text style={{ color: 'gray'}}>{usuario.email}</Text>
                    </View>

                </View>


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

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Ionicons name="log-out" size={20} color="red" style={styles.icon} />
                    <Text style={{color:'red', marginLeft:5 }}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
            
            

            <Footer />
        </View>
    )
}