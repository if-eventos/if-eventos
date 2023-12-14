import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { ButtonCategoria } from "../ButtonCategoria";

type Item = {label:string, value:string}

type Props = {
    data: Item[],
    setSelected: (value:string) => void
}

export function SelectionMenuEventoTipo({ data, setSelected }:Props) {

    const [categoria, setCategoria] = useState<string|null>(null);

    return (
        <View>
            <ButtonCategoria icon="code-slash-outline" name="ADS"                  set={() => setCategoria("ads")}/>
            <ButtonCategoria icon="calculator-outline" name="Matemática"           set={() => setCategoria("matematica")}/>
            <ButtonCategoria icon="business-outline"   name="Engenharia Civil"     set={() => setCategoria("engenharia-civil")}/>
            <ButtonCategoria icon="cog-outline"        name="Controle e Automação" set={() => setCategoria("controle-automacao")}/>
        </View>
    )
}