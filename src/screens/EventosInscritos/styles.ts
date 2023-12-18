import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    renderEventos:{
        borderWidth: 2, 
        maxHeight: 600, 
        padding: 10, 
        margin: 8,
        borderRadius: 10,
        maxWidth: 320,
        width: 280,
    },
    Image:{
        height: 100,
        backgroundColor: 'black',
        borderRadius: 5,
        resizeMode: 'cover',
    },
    ContainerEventos: {
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 200,
        width: '100%'
    },
    Container: {
        paddingHorizontal: 20
    }
});