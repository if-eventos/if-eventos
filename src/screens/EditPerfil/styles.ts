import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:20,
    backgroundColor:'#fff',
  },
  user:{
    marginTop: 60,
  },
  editPerfilText:{
    textAlign: "center", 
    fontWeight: 'bold', 
    fontSize: 16
  },
  userImage:{
    width: 150, 
    height: 150, 
    borderRadius: 100, 
    borderWidth: 2, 
    borderColor: 'black',
    alignSelf: 'center',
    marginTop:50
  },
  ProfilePhoto:{
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
},

textInput:{
  borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 6,
    width: 350
},
btnSalvar:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'green',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 20,
  color: 'black',
  marginTop: 14,
  width: 200,
  alignSelf: 'center'
}
})