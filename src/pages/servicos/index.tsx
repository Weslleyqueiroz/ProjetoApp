import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Função de normalização do chatbot
function normalizeText(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Lógica das respostas do chatbot
function getBotResponse(userMessage: string): string {
    const normalizedMessage = normalizeText(userMessage);
    const message = normalizedMessage.toLowerCase();

    if (message.includes('ola') || message.includes('oi') || 
        message.includes('bom dia') || message.includes('boa tarde') || 
        message.includes('boa noite')) {
        return "Olá! Bem-vindo(a) ao nosso Assistente Virtual. Em que posso ajudar?";
    } 
    
    else if (message.includes('agendamento') || message.includes('agendar') || message.includes('vaga')) {
        return "Para agendar, por favor, acesse a área de \"agendamento\".";
    }

    else if (message.includes('servicos') || message.includes('serviços')) {
        return "Oferecemos: Corte Masculino/Feminino, Tintura, Luzes, Balayage, Hidratação Profissional, Escuta e Penteados.";
    }
    
    else if (message.includes('horario') || message.includes('aberto') || 
             message.includes('dias') || message.includes('funcionamento')) {
        return "Nosso horário de funcionamento é de Segunda a Sexta, das 9h às 18h.";
    } 
    
    else if (message.includes('contato')) {
        return "Você pode nos contatar pelo email: corteslegais@gmail.com ou telefone: (11) 99384-4550.";
    } 
    
    else if (message.includes('local') || message.includes('endereco')) {
        return "Estamos localizados na rua Santo Antônio - 72";
    }
    
    else if (message.includes('obrigado') || message.includes('valeu') || message.includes('tchau')) {
        return "Eu que agradeço! Se precisar de algo estou a disposição!";
    } 
    
    else {
        return "Desculpe, não entendi. Por favor, tente reformular sua pergunta ou pergunte sobre 'agendamento', 'serviços', 'contato', 'local' ou 'horário'.";
    }
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const initialMessages: Message[] = [
    { id: 1, text: "Olá! Como posso te ajudar hoje?", sender: 'bot' },
];

const servicos = [
  { id: '1', nome: 'Corte de Cabelo', preco: 30 },
  { id: '2', nome: 'Barba', preco: 20 },
  { id: '3', nome: 'Sobrancelha', preco: 15 },
  { id: '4', nome: 'Completo', preco: 100 },
];

export default function Servicos() {
  const navigation = useNavigation<NavigationProp<any>>();
  
  // Estados do chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const flatListRef = useRef<FlatList>(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Animações do chatbot
  useEffect(() => {
    if (isChatOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isChatOpen]);

  // Scroll automático das mensagens
  useEffect(() => {
    if (messages.length > 0 && isChatOpen) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isChatOpen]);

  // Função para enviar mensagem
  const sendMessage = () => {
    const userMessage = inputValue.trim();
    if (userMessage === "") return;

    // Adiciona mensagem do usuário
    const newUserMessage: Message = { 
      id: Date.now(), 
      text: userMessage, 
      sender: 'user' 
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    // Simula delay e resposta do bot
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      const newBotMessage: Message = { 
        id: Date.now() + 1, 
        text: botResponse, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, newBotMessage]);
    }, 500);
  };

  // Renderizar mensagens do chatbot
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'user' ? styles.userMessageText : styles.botMessageText
      ]}>
        {item.text}
      </Text>
    </View>
  );

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
      
      {/* Botão flutuante do chatbot */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setIsChatOpen(true)}
      >
        <Text style={styles.floatingButtonText}>💬</Text>
      </TouchableOpacity>

      {/* Modal do Chatbot */}
      <Modal
        visible={isChatOpen}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsChatOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.chatContainer,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            {/* Header do chatbot */}
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderText}>Assistente Virtual</Text>
              <TouchableOpacity onPress={() => setIsChatOpen(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Área de mensagens */}
            <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.messagesContainer}
            >
              <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
                style={styles.messagesList}
                showsVerticalScrollIndicator={false}
              />
            </KeyboardAvoidingView>

            {/* Input de mensagem */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={sendMessage}
                multiline={true}
              />
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  inputValue.trim() === "" && styles.sendButtonDisabled
                ]}
                onPress={sendMessage}
                disabled={inputValue.trim() === ""}
              >
                <Text style={styles.sendButtonText}>➤</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    fontSize: 24,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    height: '80%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2563eb',
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  userMessageText: {
    color: '#1f2937',
  },
  botMessageText: {
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});