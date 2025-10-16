import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { style } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import Logo from '../../assets/logo.jpg';
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function Cadastro() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [email, setEmail] = useState('weslley');
    const [confirmEmail, setConfirmEmail] = useState('weslley');
    const [password, setPassword] = useState('12345');
    const [confirmPassword, setConfirmPassword] = useState('12345');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    async function getCadastro() {
        try {
            setLoading(true);
            if (!email || !password) {
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
            }
            navigation.replace('BottomRoutes');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
          
                <Text style={style.text}>Cadastre-se!</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.tittleInput}>Endereço de e-mail</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <Text style={style.tittleInput}>Confirme seu e-mail</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        value={email}
                        onChangeText={setConfirmEmail}
                    />
                    <MaterialIcons name="email" size={20} color={themas.colors.gray} />
                </View>
                <Text style={style.tittleInput}>SENHA</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        secureTextEntry={showPassword}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialIcons name={showPassword ? 'visibility-off' : 'remove-red-eye'} size={20} color={themas.colors.gray} />
                    </TouchableOpacity>
                </View>
                <Text style={style.tittleInput}>CONFIRME A SUA SENHA</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        onChangeText={setConfirmPassword}
                    />
                    <MaterialIcons name='remove-red-eye' size={20} color={themas.colors.gray} />
                </View>
            </View>
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={getCadastro} disabled={loading}>
                    <Text style={style.textButton}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
            {<TouchableOpacity onPress={() => navigation.replace('Login')}>
                            <Text style={style.textConta}>Não tem conta? <Text style={style.textContaCriar}>Clique aqui</Text></Text>
            </TouchableOpacity>}
        </View>
    );
}