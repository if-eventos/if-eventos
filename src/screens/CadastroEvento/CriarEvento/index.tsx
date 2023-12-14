
import { ScrollView, View } from "react-native"
import { Header } from "../../../components/Header"

import { styles } from "./styles"
import { FormCriarEvento } from "../../../components/FormCriarEvento"



export default function CriarEvento() {

    return (
        <View style={styles.Container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header pageName="Criar evento" descricao="Crie novos eventos!" />

                <FormCriarEvento />

            </ScrollView>
        </View>
    )
}