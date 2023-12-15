import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { ButtonCategoria } from "../ButtonCategoria";

import { styles } from "./styles";

type Item = {label:string, value:string}

type Props = {
    setSelected: (value:string) => void
}

export function SelectionMenuEventoTipo({ setSelected }:Props) {

    return (
        <View style={styles.container}>
            <ButtonCategoria icon="code-slash-outline" name="ADS"                  set={() => setSelected("ads")}/>
            <ButtonCategoria icon="calculator-outline" name="Matemática"           set={() => setSelected("matematica")}/>
            <ButtonCategoria icon="business-outline"   name="Engenharia Civil"     set={() => setSelected("engenharia-civil")}/>
            <ButtonCategoria icon="cog-outline"        name="Controle e Automação" set={() => setSelected("controle-automacao")}/>
        </View>
    )
}