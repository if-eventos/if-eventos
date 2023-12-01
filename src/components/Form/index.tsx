import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaZod, IRegisterUser } from "../../utils/ValidationSchemaZod";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ErrorMessage } from '../ErrorMessage';
import { styles } from './styles';
import { useState } from 'react';

export function Form() {
    const { control, handleSubmit, formState: { errors } } = useForm<IRegisterUser>({
        resolver: zodResolver(schemaZod)// aqui os dados são validados
    });

    let ehPalestrante = 0;
    const [buttonPalestranteConfirm, setButtonPalestranteConfirm] = useState(false);

    function handlePalestranteConfirm() {
        setButtonPalestranteConfirm(!buttonPalestranteConfirm);
        if(buttonPalestranteConfirm){
            ehPalestrante=1;
        }else{
            ehPalestrante=0;
        }
    }



    function handleUserRegister(data: IRegisterUser) {

        Alert.alert(
            'cadastro realizado com sucesso',
            `(${data.name})`,
            [
                { text: 'ok', }
            ]
        );
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Nome"
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                                style={styles.input}
                            />
                        )}
                    />
                    {
                        !!errors.name && <ErrorMessage description={errors.name.message} />
                    }

                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize='none'
                                style={styles.input}
                            />
                        )}
                    />
                    {
                        !!errors.email && <ErrorMessage description={errors.email.message} />
                    }

                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Senha"
                                secureTextEntry
                                style={styles.input}
                            />
                        )}
                    />
                    {
                        !!errors.password && <ErrorMessage description={errors.password.message} />
                    }

                    <Controller
                        name="telefone"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Informe o telefone"
                                secureTextEntry
                                style={styles.input}
                            />
                        )}
                    />
                    {
                        !!errors.telefone && <ErrorMessage description={errors.telefone.message} />
                    }

                    <Controller
                        name="minicurriculo"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder="Informe o minicurriculo"
                                secureTextEntry
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
                                secureTextEntry
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
                                secureTextEntry
                                style={styles.input}
                            />
                        )}
                    />

                    <View style={styles.ContainerEhPalestrante}>
                        <Text style={styles.TextPalestrante}>Sou Palestrante</Text>

                            <TouchableOpacity
                                style={buttonPalestranteConfirm ?{backgroundColor:'#23355C'} : styles.buttonPalestrante}
                                onPress={() =>handlePalestranteConfirm()}
                            >
                                <Text style={buttonPalestranteConfirm? {} : styles.buttonTextPalestrante}>Sim</Text>
                            </TouchableOpacity>

                    </View>




                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit(handleUserRegister)}
                    >
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}