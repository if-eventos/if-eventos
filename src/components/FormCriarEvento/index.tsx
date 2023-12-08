import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { schemaZodEvento, IRegisterEvent } from "../../utils/ValidationSchemaZod";
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorMessage } from '../ErrorMessage';
import { Controller, useForm } from 'react-hook-form';

import { styles } from './styles';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export function FormCriarEvento() {


    const navigation = useNavigation();


    const { control, handleSubmit, formState: { errors }, setValue } = useForm<IRegisterEvent>({
        resolver: zodResolver(schemaZodEvento)
    });


    async function handleEventRegister(data: IRegisterEvent) {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        console.log(data)
        try {
            if (!data) {
                console.error("Dados inválidos fornecidos");
                return;
            }

            const response = await api.post('/api/v1/evento/criar', data, config);

            if (response.status === 200) {
                navigation.navigate('Login');
                console.log("Evento criado com sucesso");
                return;
            } else {
                console.log("Não foi possível criar o evento");
                return;
            }
        } catch (err) {
            console.log("Não foi possível criar o evento", err);
        }
    }


    return (
        <View style={styles.telaCriarEvento}>
            <Text style={styles.titulo}>Criar novo evento</Text>
            <View style={styles.Container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView behavior="position" enabled>

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

                        {/* {
                            !!errors.site && <ErrorMessage description={errors.site.message} />
                        } */}
                        
                        {/* <Controller
                            name='site'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Site *"
                                    onBlur={field.onBlur}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    style={styles.input}
                                />
                            )}
                        /> */}

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


                        <View style={styles.ContainerCriar}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit(handleEventRegister)}
                            >
                                <Text style={styles.buttonText}>Finalizar</Text>
                            </TouchableOpacity>
                        </View>


                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}