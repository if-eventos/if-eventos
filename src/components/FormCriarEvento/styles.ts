import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    telaCriarEvento: {
        alignItems: "center",
        marginVertical: 15,
    },
    titulo: {
        fontFamily: 'Roboto',
        fontWeight: "bold",
        fontSize: 16,
        color: '#0A0A0A',
    },
    Container: {
        paddingHorizontal: 24,
        backgroundColor: '#D4DCFF',
        paddingVertical: 31,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20
    },
    input: {
        width: 290,
        height: 60,
        fontFamily: 'Roboto',
        padding: 10,
        textAlign: 'left',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#D4DCFF',
        color: '#3A3A3A',
        marginLeft: 20,
        margin: 6,
        fontSize: 14
    },
    button: {
        backgroundColor: '#A0AFED',
        width: 242,
        height: 53,
        justifyContent: 'center',
        marginTop: 5,
        borderRadius: 10,
    },
    buttonText: {
        color: '#1A1919',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    ContainerCriar: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    eventImageContainer:{
        marginLeft: 12,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    eventImage: {
        width: 260,
        height: 150,
        borderWidth: 2,
        borderColor: '#1A1919',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden",
        backgroundColor: '#ebf0f5',
        borderRadius: 7,
    },
    categoriaContainer: {
        marginVertical: 20,
    },
    calendar: {
        marginVertical: 20
    },
    MapContainer: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapButton: {
        backgroundColor: '#9ee6a2',
        color: 'black',
        width: 242,
        height: 53,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        borderRadius: 7
    },
    
})