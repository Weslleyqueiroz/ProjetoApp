import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { style } from "./styles";
import Logo from '../../assets/logo.jpg';
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authService } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getLogin() {
        try {
            setLoading(true);
            if (!email || !password) {
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
            }

            const response = await authService.login({ email, password }); 
            if (response.token) {
                await AsyncStorage.setItem('token', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));
                navigation.replace('BottomRoutes');
            } else {
                Alert.alert('Erro', 'Token não recebido');
            }

        } catch (error: any) {
            console.log('Erro na requisição de login:', error);
            Alert.alert(
                'Erro no login', 
                error.response?.data?.message || 'Não foi possível conectar-se ao servidor.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
                <Text style={style.text}>Seja bem vindo!</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.tittleInput}>Endereço de e-mail</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <MaterialIcons name="email" size={20} color={themas.colors.gray} />
                </View>
                <Text style={style.tittleInput}>SENHA</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        value={password}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialIcons 
                            name={showPassword ? 'visibility' : 'visibility-off'} 
                            size={20} 
                            color={themas.colors.gray} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.boxBottom}>
                <TouchableOpacity 
                    style={[style.button, loading && { opacity: 0.7 }]} 
                    onPress={getLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={style.textButton}>Entrar</Text>
                    )}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={style.textConta}>
                    Não tem conta? <Text style={style.textContaCriar}>Clique aqui</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}