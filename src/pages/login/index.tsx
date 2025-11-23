import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { style } from "./styles";
import Logo from '../../assets/logo.jpg';
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authService } from '../../services/auth'; // Importa o serviço de autenticação
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

            // 🛑 CORREÇÃO: authService.login() agora retorna DIRETAMENTE { token, user }
            const response = await authService.login({ email, password }); 
          
            // Desestrutura diretamente da resposta do serviço (que é {token, user})
            const { token, user } = response; 
            
           
            if (token && user) {
              
                await AsyncStorage.setItem('@barber_app:token', token);
                await AsyncStorage.setItem('@barber_app:user', JSON.stringify(user));
                
                // Mensagem de sucesso opcional
                Alert.alert('Sucesso', `Bem vindo, ${user.name}!`);
       
                navigation.replace('BottomRoutes'); 
                return; // Sai da função após o sucesso
            } else {
      
                Alert.alert('Erro', 'Resposta do servidor incompleta. Tente novamente.');
            }

        } catch (error: any) {
            console.log('Erro na requisição de login:', error);
            
            // 🛑 CORREÇÃO: Tratamento de erro robusto. Acessa 'error.response' apenas se existir.
            const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Não foi possível conectar-se ao servidor. Verifique suas credenciais.';
            
            Alert.alert(
                'Erro no login', 
                errorMessage
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
                        placeholder="seu@email.com" // Adicionado placeholder para clareza
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
                        placeholder="Digite sua senha" // Adicionado placeholder para clareza
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