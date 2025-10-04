import React from "react";

import { Button, Text, View, TouchableOpacity } from "react-native"; 

export default function List({ navigation }: any) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
     
      
      <Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Veja as nossas páginas</Text>
      </Text>

       <TouchableOpacity  
        style={{ padding: 10, backgroundColor: '#eee', marginTop: 15 }}
        onPress={() => {
            
            navigation.navigate('Login'); 
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Volte para Login</Text>
      </TouchableOpacity>

    
      <TouchableOpacity 
        style={{ padding: 10, backgroundColor: '#f0f0f0', marginTop: 5 }}
        onPress={() => navigation.navigate('Servicos')}
      >
        <Text>Ir para Serviços</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ padding: 10, backgroundColor: '#f0f0f0', marginTop: 5 }}
        onPress={() => navigation.navigate('Agendar')}
      >
        <Text>Ir para Agenda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 10, backgroundColor: '#f0f0f0', marginTop: 5 }}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text>Ir para Cadastro</Text>
      </TouchableOpacity>

    </View> 
  );
}