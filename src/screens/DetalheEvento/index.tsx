import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { styles } from "./styles"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import userInfo from "../../services/userInfo"
import api from '../../services/api';
import { useState } from "react"
import React from "react"


export default function Main() {

    const usuario = userInfo();

    const navigation = useNavigation();

   

    return (
        <View style={styles.container}>
            <ScrollView>
                <Header pageName="Detalhes do Evento" descricao="Visualize os detalhes do evento." />

                <View style={styles.user}>
                
                    <View style={{marginTop: 15, marginLeft: 5}}>
                        <Text>Teste</Text>
                    </View>

                </View>

            </ScrollView>
            
            

            <Footer />
        </View>
    )
}