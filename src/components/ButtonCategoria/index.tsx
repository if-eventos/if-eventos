import { TouchableOpacity, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from "./styles";

type Props = {
    icon:string,
    name:string,
    set: (categoria:string) => void,
}

export function ButtonCategoria({icon, name, set}:Props) {
    
    return (
        <TouchableOpacity 
        style={styles.button}
        onPress={() => set(name)}>
            <Ionicons 
                name={icon} 
                size={40}
                color="#3b6db3"
            />
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}