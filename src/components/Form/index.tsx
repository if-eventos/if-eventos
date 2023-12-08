import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

    let ehPalestrante = 0;
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

            const response = await api.post('/api/v1/user/signup', data, config);

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