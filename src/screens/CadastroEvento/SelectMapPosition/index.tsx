import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { Alert, TouchableOpacity, View, Text } from "react-native";

import { styles } from "./styles";


type Coords = {
  latitude: number,
  longitude: number,
}



export default function SelectMapPosition() {

  const navigation = useNavigation();
  const route = useRoute();
  

  const parmasPosition = route.params as Coords;
  
  const [positionMap, setPositionMap] = useState<Coords>(parmasPosition);
  const [currentLocation, setCurrentLocation] = useState<Coords | null>(null);


    async function getMyLocation() {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Habilite a permissão para obter localização!");
            return;
        }
        let location = await Location.getCurrentPositionAsync();
        setCurrentLocation(location.coords);

    }

    function handleSelectMapPosition(event: MapPressEvent) {
        setPositionMap(event.nativeEvent.coordinate);
    }

    function handleNextStep() {
        //navigation.navigate('Cadastro', { position });
        navigation.navigate('CriarEvento', positionMap );
    }

    useEffect(()=>{
        getMyLocation()
        console.log("getMyLocation()");
    },[]);


    return (
        <View style={styles.Container}>
          {currentLocation &&
          
            <MapView
              style={styles.MapConteiner}
              initialRegion={{
                latitude:currentLocation.latitude,
                longitude:currentLocation.longitude,
                latitudeDelta:0.008,
                longitudeDelta:0.008,
              }}
              onPress={handleSelectMapPosition}
              showsUserLocation
            >
    
              {positionMap.latitude !== 0 && (
                <Marker 
                icon={require('../../../images/mapMarker.png')}
                coordinate ={{
                  latitude:positionMap.latitude,
                  longitude: positionMap.longitude,
                }}
              />
            )}
              
            </MapView>
          }
    
          {positionMap.latitude !== 0 && (
          <TouchableOpacity style={styles.NextButton} onPress={handleNextStep}>
            <Text style={styles.TextNextButton}>Próximo</Text>
          </TouchableOpacity>
          )}
        </View>
      );
}