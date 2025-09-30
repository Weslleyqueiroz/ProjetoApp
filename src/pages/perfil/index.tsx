import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    const carregarServicos = async () => {
      const dados = await AsyncStorage.getItem('servicosUsados');
      if (dados) {
        setServicos(JSON.parse(dados));
      }
    };

    carregarServicos();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Usuário Comum</Text>
      <Text style={{ fontSize: 16, color: '#888', marginBottom: 20 }}>Meus Serviços</Text>
      <FlatList
        data={servicos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#eee',
              padding: 14,
              borderRadius: 8,
              marginBottom: 10,
              width: 320,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.nome}</Text>
            <Text style={{ fontSize: 16 }}>Preço: R$ {item.preco}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>
              Data: {item.data} | Hora: {item.hora}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888', marginTop: 20 }}>Nenhum serviço agendado.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}