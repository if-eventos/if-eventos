import { useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'

type Item = {label:string, value:string}

type Props = {
    data: Item[],
    setSelected: (value:string) => void
}

export function SelectionMenuEventoTipo({ data, setSelected }:Props) {

    return (
        <SelectList 
            setSelected={(val:Item) => setSelected(val.value)} 
            data={data} 
            save="value"
        />
    )
}