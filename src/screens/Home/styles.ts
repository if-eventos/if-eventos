import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    //paddingHorizontal:24,
    paddingTop:30,
    backgroundColor:'#fff',
  },
  BoasVindas:{
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    margin: 20
  },
  opcao: {
    padding: 10,
    marginTop: 30,
    marginLeft: 20,
    borderRadius: 30,
    marginRight: 20
  },
  opcaoTexto: {
    fontSize: 16,
  },
  opcaoEventos:{
    marginTop: 10,
    padding: 10,
    marginLeft: 30,
    borderRadius: 20,
    marginRight: 5,
  },
  Image:{
    height: 100,
    backgroundColor: 'black',
    borderRadius: 5,
    resizeMode: 'cover',
  },
  eventosEduc:{
    height: 280, 
    margin: 20,
    maxWidth: 380,
    borderRadius: 5
  },

  renderEventos:{
  borderWidth: 2, 
  maxHeight: 600, 
  padding: 10, 
  margin: 8,
  borderRadius: 10,
  maxWidth: 320,
  width: 280,
  }
})