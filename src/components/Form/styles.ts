import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#fffff',
    },
    title: {
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 32,
        fontStyle: 'italic'
    },
    imagem: {
        alignContent: 'center',
        width: '100%',
        height: '50%',
        marginTop: 50
    },
    input: {
        width: '90%',
        height: 60,
        fontFamily: 'Roboto',
        padding: 10,
        textAlign: 'left',
        borderRadius: 8,
        backgroundColor: '#D4DCFF',
        color: '#3A3A3A',
        marginLeft: 20,
        margin: 6,
        fontSize: 14
    },
    button: {
        backgroundColor: '#23355C',
        width: 242,
        height: 53,
        justifyContent: 'center',
        marginLeft: 65,
        marginTop: 5,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    textoHookCad: {
        textAlign: 'center',
        fontSize: 12,
        margin: 4
    },
    linkText: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    ContainerEhPalestrante: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        gap: 40,
    },
    TextPalestrante: {
        color: 'black',
        fontWeight: 'bold'
    },
    buttonPalestrante: {
        backgroundColor: '#D4DCFF',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonTextPalestrante: {
        color: 'black',
        fontWeight: 'bold'
    }
})