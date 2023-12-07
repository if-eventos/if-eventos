import { View, Text, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from "./styles";

type Props = {
    pageName: string
    descricao: string
}


export function Header({ pageName, descricao }: Props) {

    const navigation = useNavigation();

    const voltarPagina = () => {
        navigation.goBack();
    };


    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={voltarPagina}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Text style={styles.pageName}>{pageName}</Text>
                <Text style={styles.descricao}>{descricao}</Text>
            </View>
        </View>
    )
}