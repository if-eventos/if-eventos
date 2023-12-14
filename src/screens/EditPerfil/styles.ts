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
  },
  editPerfilText:{
    textAlign: "center", 
    fontWeight: 'bold', 
    fontSize: 16
  },
  userImage:{
    width: 82, 
    height: 80, 
    borderRadius: 80, 
    borderWidth: 1, 
    borderColor: 'black',
    alignSelf: 'center',
    marginTop:50
  },
  ProfilePhoto:{
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center'
},
profile: {
    width: 260,
    height: 150,
    borderWidth: 2,
    borderColor: '#1A1919',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
    backgroundColor: '#9fb1ff'
},
})