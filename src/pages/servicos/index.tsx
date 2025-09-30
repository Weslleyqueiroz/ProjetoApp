import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const servicos = [
  { id: '1', nome: 'Corte de Cabelo', preco: 30 },
  { id: '2', nome: 'Barba', preco: 20 },
  { id: '3', nome: 'Sobrancelha', preco: 15 },
  { id: '4', nome: 'Completo', preco: 100 },
];

export default function Servicos() {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Serviços</Text>
      <FlatList
        data={servicos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: '#eee',
              marginBottom: 10,
              borderRadius: 8,
              elevation: 2,
            }}
            onPress={() => navigation.navigate('Agendar', { servico: item })}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.nome}</Text>
            <Text style={{ fontSize: 16, color: '#888' }}>R$ {item.preco}</Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Clique para agendar</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
