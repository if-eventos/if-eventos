import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    //paddingHorizontal:24,
    paddingTop:30,
    backgroundColor:'#fff',
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