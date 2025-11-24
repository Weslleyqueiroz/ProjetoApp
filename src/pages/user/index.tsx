import React, { useState } from "react";
// Importamos o ScrollView aqui 
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native'; 
import { style } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import Logo from '../../assets/logo.jpg';
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authService } from '../../services/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getCadastro() {
        try {
            setLoading(true);
            
            // ✅ VALIDAÇÕES
            if (!name || !email || !password) {
                Alert.alert('Atenção', 'Informe todos os campos obrigatórios!');
                return;
            }
            
            if (email !== confirmEmail) {
                Alert.alert('Atenção', 'Os e-mails não coincidem!');
                return;
            }
            
            if (password !== confirmPassword) {
                Alert.alert('Atenção', 'As senhas não coincidem!');
                return;
            }

            // 🛑 CORREÇÃO FINAL: Recebe a resposta COMPLETA (que já é {token, user} do authService)
            const response = await authService.register({ 
                name, 
                email, 
                password 
            });

            // 🛑 CORREÇÃO: Desestrutura token e user DIRETAMENTE de 'response'
            const { token, user } = response;
            
            if (token && user) {
                // ✅ Sucesso: Salva e NAVEGA
                await AsyncStorage.setItem('@barber_app:token', token);
                await AsyncStorage.setItem('@barber_app:user', JSON.stringify(user));
                
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                // Redireciona para o Login
                navigation.replace('Login'); 
                return; // Importante para sair da função
            } else {
                // Se o Back-end retornou 200, mas sem token/user (resposta incompleta)
                Alert.alert('Erro', 'Resposta do servidor incompleta. Tente novamente.');
            }

        } catch (error: any) {
            console.log('Erro no cadastro:', error);
            
            // 🛑 CORREÇÃO: Tratamento de erro robusto para capturar erros do Axios ou outros
            const errorMessage = error.response?.data?.error 
                                || error.response?.data?.message 
                                || 'Não foi possível realizar o cadastro. Tente novamente.';

            Alert.alert(
                'Erro no cadastro', 
                errorMessage
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        // A CORREÇÃO DE LAYOUT: Usamos ScrollView para permitir rolagem
        <ScrollView contentContainerStyle={style.container} keyboardShouldPersistTaps="handled">
            
            <View style={style.boxTop}>
                <Text style={style.text}>Cadastre-se!</Text>
            </View>
            
            <View style={style.boxMid}>
                <Text style={style.tittleInput}>Nome completo</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu nome"
                    />
                    <MaterialIcons name="person" size={20} color={themas.colors.gray} />
                </View>

                <Text style={style.tittleInput}>Endereço de e-mail</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="seu@email.com"
                    />
                </View>

                <Text style={style.tittleInput}>Confirme seu e-mail</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="confirme@email.com"
                    />
                    <MaterialIcons name="email" size={20} color={themas.colors.gray} />
                </View>

                <Text style={style.tittleInput}>SENHA</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialIcons 
                            name={showPassword ? 'visibility' : 'visibility-off'} 
                            size={20} 
                            color={themas.colors.gray} 
                        />
                    </TouchableOpacity>
                </View>

                <Text style={style.tittleInput}>CONFIRME A SUA SENHA</Text>
                <View style={style.icone}>
                    <TextInput
                        style={style.input}
                        secureTextEntry={!showPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirme sua senha"
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
                    onPress={getCadastro} 
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={style.textButton}>Cadastrar</Text>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={style.textConta}>
                    Já tem conta? <Text style={style.textContaCriar}>Faça login</Text>
                </Text>
            </TouchableOpacity>
            
        </ScrollView>
    );
}