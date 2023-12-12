import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { schemaZod, IRegisterUser } from "../../utils/ValidationSchemaZod";
import { ScrollView, TextInput, Image } from 'react-native';
import { ErrorMessage } from '../ErrorMessage';
import { styles } from './styles';
import { useState } from 'react';

import api from '../../services/api';

export function Form({ navigation }: any) {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<IRegisterUser>({
        resolver: zodResolver(schemaZod)
    });

    
    const [buttonPalestranteConfirm, setButtonPalestranteConfirm] = useState(false);

    function handlePalestranteConfirm() {
        const ButtonState = !buttonPalestranteConfirm
        setButtonPalestranteConfirm(ButtonState);
        if (ButtonState) {
            setValue('ehPalestrante', 1);
        } else {
            setValue('ehPalestrante', 0);
        }
    }



    //handle image:
    const [imagePath, setImagePath] = useState<string>();
    async function handleSelectImage() {
        // tenho acesso a galeria de fotos e não a câmera
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        /* console.log(status); */
        if (status !== 'granted') {// granted é quando o usuário deu permissão
            alert('Eita, precisamos de acesso às suas fotos...');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            // permite ao usuario editar a imagem (crop), antes de subir o app
            allowsEditing: true,
            quality: 1,
            aspect: [3, 3],
            //quero apensas imagems e não vídeo tb
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        /* console.log(result); */
        if (!result.canceled) { // se cancelou o upload da imagem
            // questão do conceito de imutabilidade. sempre que uma imagem for adicionado, 
            //temos que copiar as imagens que tinha antes no array. 
            //se não vai apagar na próxima renderização. pois começa sempre do zero
            setImagePath(result.assets[0].uri);
            console.log(imagePath);
        }
    }



    const [errorCriarNovoUsuario, setErrorCriarNovoUsuario] = useState(false);
    async function handleUserRegister(data: IRegisterUser) {

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        try {
            if (!data) {
                console.error("Dados inválidos fornecidos");
                return;
            }

            const dataForm = new FormData();

            dataForm.append('name', data.name);
            dataForm.append('email', data.email);
            dataForm.append('password', data.password);
            dataForm.append('telefone', data.telefone);
            dataForm.append('ehPalestrante', `${data.ehPalestrante}`);

            if (data.minicurriculo) {
                dataForm.append('minicurriculo', data.minicurriculo);
            }
            if (data.urlsite) {
                dataForm.append('urlsite', data.urlsite);
            }
            if (data.curriculo_redesocial) {
                dataForm.append('curriculo_redesocial', data.curriculo_redesocial);
            }
            if (imagePath) {
                dataForm.append('image', {
                    name: `imagehash.jpg`,
                    type: 'image/jpg',
                    uri: imagePath,
                } as any);
            }

            console.log(dataForm);
            const response = await api.post('/api/v1/user/signup', dataForm, config);

            if (response.status === 201) {
                setErrorCriarNovoUsuario(false);
                navigation.navigate('Login', { email: data.email });
                console.log("Usuário criado com sucesso");
                return;
            } else {
                setErrorCriarNovoUsuario(true);
                console.log("Não foi possível criar o usuário");
                return;
            }
        } catch (err) {
            setErrorCriarNovoUsuario(true);
            console.log("Não foi possível criar o usuário", err);
        }
    }



    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="position" enabled>


                    <View style={styles.ProfilePhoto}>
                        <TouchableOpacity
                            style={styles.profile}
                            onPress={handleSelectImage}
                        >
                            {
                                imagePath ?
                                    <Image source={{ uri: imagePath, width: 90, height: 90 }} />
                                    :
                                    <AntDesign name="plus" size={80} color="black" />
                            }
                        </TouchableOpacity>
                    </View>


                    {
                        !!errors.name && <ErrorMessage description={errors.name.message} />
                    }
                    <Controller
                        name='name'
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
                        errorCriarNovoUsuario ? <ErrorMessage description={"Email indisponível"} /> : <></>
                    }
                    {
                        !!errors.email && <ErrorMessage description={errors.email.message} />
                    }
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email *"
                                keyboardType="email-address"
                                autoCapitalize='none'
                                style={styles.input}
                            />
                        )}
                    />

                    {
                        !!errors.password && <ErrorMessage description={errors.password.message} />
                    }
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Senha *"
                                secureTextEntry
                                style={styles.input}
                            />
                        )}
                    />

                    {
                        !!errors.telefone && <ErrorMessage description={errors.telefone.message} />
                    }
                    <Controller
                        name="telefone"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Informe o telefone *"
                                style={styles.input}
                            />
                        )}
                    />

                    <Controller
                        name="minicurriculo"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Informe o minicurriculo"
                                style={styles.input}
                            />
                        )}
                    />


                    <Controller
                        name="urlsite"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Informe o urlsite"
                                style={styles.input}
                            />
                        )}
                    />


                    <Controller
                        name="curriculo_redesocial"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Informe o curriculo_redesocial"
                                style={styles.input}
                            />
                        )}
                    />


                    <View style={styles.ContainerEhPalestrante}>
                        <Text style={styles.TextPalestrante}>Sou Palestrante</Text>
                        <Controller
                            name="ehPalestrante"
                            control={control}
                            defaultValue={0}
                            render={({ field: { onChange, value } }) => (
                                <TouchableOpacity
                                    onPress={() => handlePalestranteConfirm()}

                                >
                                    {
                                        buttonPalestranteConfirm
                                            ?
                                            <AntDesign name="checksquare" size={50} color="green" />
                                            :
                                            <Ionicons name="md-square-outline" size={48} color="black" />
                                    }
                                </TouchableOpacity>
                            )}
                        />

                    </View>






                    <View style={styles.ContainerCriar}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit(handleUserRegister)}
                        >
                            <Text style={styles.buttonText}>Criar</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.textoHookCad}>
                    Você já possui uma conta?{' '}<Text style={styles.linkText}>Sign-in</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}