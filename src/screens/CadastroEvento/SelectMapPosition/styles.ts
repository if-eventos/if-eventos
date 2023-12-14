import { StyleSheet } from "react-native"

import { Dimensions } from 'react-native';


export const styles = StyleSheet.create({
    Container: {
        flex:1,
        position: "relative",
    },
    MapConteiner: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    NextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 56,

        position: "absolute",
        left: 24,
        right: 24,
        bottom: 40
    },
    TextNextButton: {
        color: '#fff',
        fontSize: 16,
    }
})