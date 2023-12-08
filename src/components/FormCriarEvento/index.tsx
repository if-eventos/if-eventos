import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { schemaZodEvento, IRegisterEvent } from "../../utils/ValidationSchemaZod";
import { zodResolver } from '@hookform/resolvers/zod';

import { ErrorMessage } from '../ErrorMessage';
import { Controller, useForm } from 'react-hook-form';

import { styles } from './styles';

export function FormCriarEvento() {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<IRegisterEvent>({
        resolver: zodResolver(schemaZodEvento)
    });


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

                        {
                            !!errors.site && <ErrorMessage description={errors.site.message} />
                        }
                        <Controller
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


                        <View style={styles.ContainerCriar}>
                            <TouchableOpacity
                                style={styles.button}
                            //onPress={handleSubmit(handleEventRegister)}  -- Implementar depois
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