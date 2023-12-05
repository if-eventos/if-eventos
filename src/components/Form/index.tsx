import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { schemaZod, IRegisterUser } from "../../utils/ValidationSchemaZod";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ErrorMessage } from '../ErrorMessage';
import { styles } from './styles';
import { useState } from 'react';

export function Form() {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<IRegisterUser>({
        resolver: zodResolver(schemaZod)// aqui os dados são validados
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



    function handleUserRegister(data: IRegisterUser) {
        console.log(data)

        Alert.alert(
            'cadastro realizado com sucesso',
            `(${data.name})`,
            [
                { text: 'ok', }
            ]
        );
    }

    return (
        <View style={styles.container}>
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
                                    //style={buttonPalestranteConfirm ? styles.buttonPalestranteNao : styles.buttonPalestranteSim}
                                    onPress={() => handlePalestranteConfirm()}
                                    
                                >
                                    {
                                        buttonPalestranteConfirm
                                            ?
                                            <AntDesign name="checksquare" size={50} color="green" />
                                            :
                                            //<FontAwesome name="square-o" size={55} color="black" />
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
        </View>
    )
}