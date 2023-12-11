import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:20,
    paddingTop:50,
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
    flexDirection: 'row',  // Organiza os filhos em linha (ícone à esquerda, texto à direita)
    borderRadius: 5,  // Borda arredondada
    padding:5
  },
})