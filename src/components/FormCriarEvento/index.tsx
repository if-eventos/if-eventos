import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { schemaZodEvento, IRegisterEvent } from "../../utils/ValidationSchemaZod";
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorMessage } from '../ErrorMessage';
import { Controller, useForm } from 'react-hook-form';

import { styles } from './styles';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

import { SelectionMenuEventoTipo } from '../SelectionMenuEventoTipo';



type Coords = {
    latitude: number,
    longitude: number,
}


export function FormCriarEvento() {


    const navigation = useNavigation();
    const route = useRoute();


    const { control, handleSubmit, formState: { errors }, setValue } = useForm<IRegisterEvent>({
        resolver: zodResolver(schemaZodEvento)
    });


    //Controla a latitude e longitude do evento
    const [position, setPosition] = useState<Coords>({ latitude: 0, longitude: 0 });
    //handle image:
    const [imagePath, setImagePath] = useState<string>();
    //handle categoria
    const [categoria, setCategoria] = useState<string>('');

    useEffect(() => {
        if (route.params) {
          const { latitude, longitude } = route.params as Coords; //vai tratar o route.params como um tipo específico
          setPosition({latitude, longitude});
        }
      }, [route.params]);


    async function handleSelectImage() {
        // tenho acesso a galeria de fotos e não a câmera
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        /* console.log(status); */
        if(status !== 'granted'){// granted é quando o usuário deu permissão
          alert('Eita, precisamos de acesso às suas fotos...');
          return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          // permite ao usuario editar a imagem (crop), antes de subir o app
          allowsEditing: true,
          quality: 1,
          aspect: [5, 3],
          //quero apensas imagems e não vídeo tb
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        /* console.log(result); */
        if(!result.canceled) { 
          setImagePath(result.assets[0].uri);
          console.log(imagePath);
        }
      }


    async function handleEventRegister(data: IRegisterEvent) {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        try {
            const dataForm = new FormData();

            dataForm.append('nome', data.nome);
            dataForm.append('descricao', data.descricao);
            dataForm.append('data_hora', data.data_hora);
            dataForm.append('urlsiteoficial', data.urlsiteoficial);

            if (categoria) {
                dataForm.append('categoria', categoria);
            } else {
                console.error("Categoria é obrigatório!");
                return;
            }

            if(imagePath) {
                dataForm.append('image', {
                            name: `imagehash.jpg`,
                            type: 'image/jpg',
                            uri: imagePath,
                  } as any);
            }
            if(position.latitude !== 0 && position.longitude !== 0) {
                dataForm.append('latitude', position.latitude.toString());
                dataForm.append('longitude', position.longitude.toString());
            }

            console.log(dataForm);

            const response = await api.post('/api/v1/evento/criar', dataForm, config);
            

            if (response.status === 200) {
                console.log("Evento criado com sucesso");
                navigation.navigate('Home');
                return;
            } else {
                console.log("Não foi possível criar o evento. Response: " + response);
                return;
            }
        } catch (err) {
            console.log("Não foi possível criar o evento", err);
            console.log("Verifique se a configuração em services está correta.");
            alert('Verifique se a configuração em services está correta.');
            return;
        }
    }


    /* const [selected, setSelected] = useState("");
    
    const data = [
        { label: "Educaçao", value: "educacao" },
        { label: "Saúde", value: "saude" },
        { label: "Medicina", value: "medicina" },
        { label: "Direito", value: "direito" },
        { label: "Programação", value: "programacao" },
        { label: "Jornalismo", value: "jornalismo" },
        { label: "Esportes", value: "esportes" },
    ]; */


    return (
        <View style={styles.telaCriarEvento}>
            <Text style={styles.titulo}>Criar novo evento</Text>
            <View style={styles.Container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>

                        <View style={styles.ProfilePhoto}>
                            <TouchableOpacity
                                style={styles.profile}
                                onPress={handleSelectImage}
                            >
                                {
                                    imagePath ?
                                        <Image source={{uri: imagePath, width: 270, height: 150}} />
                                    :
                                        <AntDesign name="pluscircleo" size={80} color="black" />
                                }
                            </TouchableOpacity>
                        </View>




                        {
                            !!errors.nome && <ErrorMessage description={errors.nome.message} />
                        }
                        <Controller
                            name='nome'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Nome *"
                                    onBlur={field.onBlur}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    style={styles.input}
                                />
                            )}
                        />

                        {
                            !!errors.descricao && <ErrorMessage description={errors.descricao.message} />
                        }
                        <Controller
                            name='descricao'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Descricao *"
                                    onBlur={field.onBlur}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    style={styles.input}
                                />
                            )}
                        />

                        {
                            !!errors.data_hora && <ErrorMessage description={errors.data_hora.message} />
                        }
                        <Controller
                            name='data_hora'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Data e Hora*"
                                    onBlur={field.onBlur}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    style={styles.input}
                                />
                            )}
                        />


                        {
                            !!errors.urlsiteoficial && <ErrorMessage description={errors.urlsiteoficial.message} />
                        }
                        <Controller
                            name='urlsiteoficial'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Url do site *"
                                    onBlur={field.onBlur}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    style={styles.input}
                                />
                            )}
                        />


                        {/* {
                            !!errors.categoria && <ErrorMessage description={errors.categoria.message} />
                        } */}
                        <View style={styles.categoriaContainer}>
                        {
                            categoria 
                            ?
                                <Text style={styles.categoriaText}>{categoria}</Text>
                            :
                                <Text style={styles.categoriaText}>Seleciona uma categoria:</Text>
                        }
                        </View>
                        <SelectionMenuEventoTipo setSelected={setCategoria} />

                        {/* Menu Drop down */}
                        {/* <SelectionMenuEventoTipo data={data} setSelected={setSelected} /> */}

                        <View style={styles.ContainerCriar}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('SelectMapPosition', position )}
                            >
                                <Text style={styles.buttonText}>Mapa posicao</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mapButton} >
                            {
                                position.latitude !== 0 
                                ?
                                    <Text>{position.latitude + " " + position.longitude}</Text>
                                :
                                    <Text>Nenhuma localização selecionada</Text>
                            }
                        </View>


                        <View style={styles.ContainerCriar}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit(handleEventRegister)}
                            >
                                <Text style={styles.buttonText}>Finalizar</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}