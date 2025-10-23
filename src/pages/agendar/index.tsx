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

  const onChange = (e:any, d?: Date) => { setShowDate(false); if (d) setDate(d); };

  const confirmarAgendamento = async () => {
    if (!horaSelecionada) return Alert.alert('Selecione um horário');
    // pegar email do usuário (exemplo: armazenado em AsyncStorage após login)
    const userData = await AsyncStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    const userEmail = user?.email || 'teste@exemplo.com';

    try {
      const resp = await servicesApi.scheduleService({
        userEmail,
        serviceId: servico.id,
        date: date.toISOString(),
        time: horaSelecionada
      });
      // opcional: salvar localmente para o perfil
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

      Alert.alert('Agendamento confirmado');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro ao agendar');
    }
  };

  return (
    <View style={{flex:1,padding:20}}>
      <Text style={{fontWeight:'bold'}}>{servico?.nome} - R$ {servico?.preco}</Text>
      <Button title="Escolher data" onPress={() => setShowDate(true)} />
      {showDate && <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />}
      <Text style={{marginTop:10}}>Horários:</Text>
      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        {horarios.map(h=>(
          <TouchableOpacity key={h} onPress={()=>setHoraSelecionada(h)} style={{margin:6,padding:8,backgroundColor: h===horaSelecionada ? '#4caf50' : '#eee', borderRadius:6}}>
            <Text style={{color: h===horaSelecionada ? '#fff':'#000'}}>{h}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{marginTop:20}}>
        <Button title="Confirmar Agendamento" onPress={confirmarAgendamento} />
      </View>
    </View>
  );
}
