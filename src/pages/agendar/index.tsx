import React, { useState } from 'react';
import { View, Text, Button, Platform, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';

const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export default function Agendar() {
  const route = useRoute();
  const { servico } = route.params as any;
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [horaSelecionada, setHoraSelecionada] = useState('');

  const onChange = (event: any, selectedDate?: Date) => {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const confirmarAgendamento = () => {
    if (!horaSelecionada) {
      Alert.alert('Selecione um horário para confirmar!');
      return;
    }
    Alert.alert(
      'Agendamento Confirmado',
      `Serviço: ${servico?.nome}\nPreço: R$ ${servico?.preco}\nData: ${date.toLocaleDateString()}\nHorário: ${horaSelecionada}`
    );
   
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Agendar: {servico?.nome}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Preço: R$ {servico?.preco}</Text>
      <Button title="Escolher data" onPress={() => setShowDate(true)} />
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Horários disponíveis:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        {horarios.map(hora => (
          <TouchableOpacity
            key={hora}
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: horaSelecionada === hora ? '#4caf50' : '#eee',
              borderRadius: 6,
            }}
            onPress={() => setHoraSelecionada(hora)}
          >
            <Text style={{ color: horaSelecionada === hora ? '#fff' : '#333', fontWeight: 'bold' }}>{hora}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ marginTop: 20 }}>
        Data selecionada: <Text style={{ fontWeight: 'bold' }}>{date.toLocaleDateString()}</Text>
      </Text>
      <Text>
        Horário selecionado: <Text style={{ fontWeight: 'bold' }}>{horaSelecionada || 'Nenhum'}</Text>
      </Text>
      <View style={{ marginTop: 30 }}>
        <Button title="Confirmar Agendamento" onPress={confirmarAgendamento} />
      </View>
    </View>
  );
}
