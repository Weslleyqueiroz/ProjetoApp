import React, { useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { servicesApi } from '../../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const horarios = ['09:00','10:00','11:00','14:00','15:00','16:00'];

export default function Agendar() {
  const route = useRoute();
  const navigation = useNavigation();
  const { servico } = (route.params || {}) as any;
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [horaSelecionada, setHoraSelecionada] = useState('');

  const onChange = (e: any, d?: Date) => { 
    setShowDate(false); 
    if (d) setDate(d); 
  };

  const confirmarAgendamento = async () => {
    if (!horaSelecionada) return Alert.alert('Selecione um horário');
    
    // Pegar dados do usuário
    const userData = await AsyncStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    const userEmail = user?.email || 'teste@exemplo.com';
    const userName = user?.name || 'Cliente';

    try {
      // Estrutura completa que a API provavelmente espera
      const agendamentoData = {
        userEmail,
        userName, // Campo que provavelmente estava faltando
        serviceId: servico.id,
        serviceName: servico.nome, // Campo importante
        servicePrice: servico.preco, // Campo importante
        date: date.toISOString().split('T')[0], // Formato YYYY-MM-DD
        time: horaSelecionada,
        status: 'pending' // Campo que muitas APIs exigem
      };

      console.log('📤 Enviando para API:', agendamentoData);

      const resp = await servicesApi.scheduleService(agendamentoData);

      // Salvar localmente
      const antigos = await AsyncStorage.getItem('servicosUsados');
      const lista = antigos ? JSON.parse(antigos) : [];
      lista.push({
        id: resp.appointment?.id || Date.now().toString(),
        nome: servico.nome,
        preco: servico.preco,
        data: new Date(date).toLocaleDateString(),
        hora: horaSelecionada
      });
      await AsyncStorage.setItem('servicosUsados', JSON.stringify(lista));

      Alert.alert('Sucesso', 'Agendamento confirmado!');
      navigation.goBack();
    } catch (err: any) {
      console.log('❌ Erro detalhado:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      Alert.alert(
        'Erro ao agendar', 
        err.response?.data?.error || 'Verifique os dados e tente novamente'
      );
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        {servico?.nome}
      </Text>
      <Text style={{fontSize: 18, color: '#666', marginBottom: 20}}>
        R$ {servico?.preco}
      </Text>

      <Button 
        title={`Data: ${date.toLocaleDateString('pt-BR')}`} 
        onPress={() => setShowDate(true)} 
      />
      
      {showDate && (
        <DateTimePicker 
          value={date} 
          mode="date" 
          display="default" 
          onChange={onChange} 
        />
      )}

      <Text style={{marginTop: 20, marginBottom: 10, fontSize: 16}}>
        Horários disponíveis:
      </Text>
      
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {horarios.map(h => (
          <TouchableOpacity 
            key={h} 
            onPress={() => setHoraSelecionada(h)} 
            style={{
              margin: 6,
              padding: 12,
              backgroundColor: h === horaSelecionada ? '#4caf50' : '#eee',
              borderRadius: 8,
              minWidth: 80,
              alignItems: 'center'
            }}
          >
            <Text style={{
              color: h === horaSelecionada ? '#fff' : '#000',
              fontWeight: h === horaSelecionada ? 'bold' : 'normal'
            }}>
              {h}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {horaSelecionada && (
        <Text style={{marginTop: 10, color: '#4caf50'}}>
          ✅ Horário selecionado: {horaSelecionada}
        </Text>
      )}

      <View style={{marginTop: 30}}>
        <Button 
          title="Confirmar Agendamento" 
          onPress={confirmarAgendamento}
          color="#4caf50"
        />
      </View>
    </View>
  );
}