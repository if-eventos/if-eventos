import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:20,
    backgroundColor:'#fff',
  },
  user:{
    marginTop: 60,
    marginLeft: 30,
    flexDirection: 'row'
  },
  editar:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5
  },
  icon: {
    marginLeft: 30,
},
button: {
    marginTop: 20,
    height: 30,
    width:120,
    flexDirection: 'row', 
    borderRadius: 5,  
    padding:5
},

renderEventos:{
  borderWidth: 2, 
  maxHeight: 600, 
  padding: 10, 
  margin: 5,
  borderRadius: 10,
  maxWidth: 330,
  width:330,
  
},

Image:{
  height: 180,
  backgroundColor: 'black',
  borderRadius: 5,
  resizeMode: 'cover',
},
participarButton:{
  borderWidth: 1,
  marginTop: 30,
  borderRadius: 5,
  padding: 20,
  marginLeft: 10
},
participantesContainer:{
  fontSize: 18,
  color: 'black',
  marginTop: 20
}

})