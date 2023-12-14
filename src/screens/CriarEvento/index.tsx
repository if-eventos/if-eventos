
import { ScrollView, View } from "react-native"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"

import { styles } from "./styles"
import { FormCriarEvento } from "../../components/FormCriarEvento"
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"

interface ParamsPositions {
    position: {
      latitude:string; 
      longitude: string;
    };
  }

export default function CriarEvento() {

    const route = useRoute();

    const [paramsPosition, setParamsPosition] = useState<ParamsPositions>({ position: {latitude: "0", longitude: "0"} });
    useEffect(() => {
        if (route.params) {
            const {position} = route.params as ParamsPositions;; //vai tratar o route.params como um tipo específico
            setParamsPosition({position});
        }
      }, [route.params]);


    return (
        <View style={styles.Container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header pageName="Criar evento" descricao="Crie novos eventos!" />

                <FormCriarEvento latitude={paramsPosition.position.latitude} longitude={paramsPosition.position.longitude} />

            </ScrollView>
        </View>
    )
}