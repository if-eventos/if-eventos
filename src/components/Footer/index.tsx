import { TouchableOpacity, View } from "react-native";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { styles } from "./styles";

import { useNavigation } from "@react-navigation/native";

export function Footer() {

    const navigation = useNavigation();

    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Feather name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("EventosInscritos")}>
                <Feather name="star" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CriarEvento")}>
                <Feather name="plus-square" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                <Ionicons name="person-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}