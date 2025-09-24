import React, { useState } from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Button} from 'react-native';
import { style } from "./styles";
import {MaterialIcons} from '@expo/vector-icons';
import Logo from '../../assets/logo.jpg';
import { themas } from "../../global/themes";
import{ useNavigation , NavigationProp} from '@react-navigation/native';



export default function Login(){

    const navigation = useNavigation<NavigationProp<any>>();
    const[email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function getLogin(){
        try {
            if(!email || !password){
                return Alert.alert('Atenção','Informe os campos obrigatórios')
            }

            navigation.navigate('BottomRoutes')
            console.log('logado com sucesso!')
        } catch (error) {
            console.log(error)
            
        }
    }

    
    
    

    return  (


           

        <View style = {style.container}>
            <View style = {style.boxTop}>
                <Image source = {Logo} 
                style = {style.logo}
                resizeMode="contain"
                ></Image>
                
                <Text style = {style.text}>Seja bem vindo!</Text>
            </View>

            <View style = {style.boxMid}>
                  <Text style = {style.tittleInput}>Endereço de e-mail</Text>
                 <View style = {style.icone}>
                    <TextInput
                        style = {style.input}
                        value ={email}
                        onChangeText={(e)=>setEmail(e)}
                        />
                    <MaterialIcons name="email" size={20} color={themas.colors.gray}/>
            </View>
                 <Text style = {style.tittleInput}>SENHA</Text>
                   <View style = {style.icone}>
                    <TextInput
                        style = {style.input}
                        onChangeText={setPassword}
                        />
                    <MaterialIcons name='remove-red-eye' size={20} color={themas.colors.gray}/>
            </View>
            </View>
            <View style = {style.boxBottom}>
                <TouchableOpacity style = {style.button} onPress = {()=>getLogin()}>
                        <Text style = {style.textButton}>Entrar</Text>
                </TouchableOpacity>
              

            </View>
            <Text style = {style.textConta}>Não tem conta? <Text  style = {style.textContaCriar}>Clique aqui</Text></Text>
        </View>

    )
}