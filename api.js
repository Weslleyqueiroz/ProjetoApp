const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const services = [
  { id: '1', nome: 'Corte de Cabelo', preco: 30 },
  { id: '2', nome: 'Barba', preco: 20 },
  { id: '3', nome: 'Sobrancelha', preco: 15 },
];

let appointments = [];

app.post('/login', (req, res) => {
  console.log('✅ BACKEND: Login recebido', req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'E-mail e senha são obrigatórios.' 
    });
  }

  if (email === 'teste@exemplo.com' && password === '123456') {
    console.log('✅ BACKEND: Login bem-sucedido');
    return res.json({
      success: true,
      message: 'Login bem-sucedido!',
      user: { 
        id: 1, 
        name: 'Usuário Teste', 
        email: email 
      },
      token: 'fake-jwt-token-12345'
    });
  } else {
    console.log('❌ BACKEND: Credenciais inválidas');
    return res.status(401).json({ 
      success: false,
      message: 'Credenciais inválidas' 
    });
  }
});

app.post('/register', (req, res) => {
  console.log('✅ BACKEND: Registro recebido', req.body);
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Todos os campos são obrigatórios.' 
    });
  }

  return res.json({
    success: true,
    message: 'Usuário registrado com sucesso!',
    user: { name, email }
  });
});

app.get('/services', (req, res) => {
  res.json(services);
});

app.post('/appointments', (req, res) => {
  const { userEmail, serviceId, date, time } = req.body;
  if (!userEmail || !serviceId || !date || !time) {
    return res.status(400).json({ message: 'Dados incompletos.' });
  }

  const id = Date.now().toString();
  const appt = { id, userEmail, serviceId, date, time };
  appointments.push(appt);
  return res.status(201).json({ message: 'Agendamento criado', appointment: appt });
});

app.get('/appointments/user/:email', (req, res) => {
  const { email } = req.params;
  const userAppts = appointments.filter(a => a.userEmail === email);
  return res.json(userAppts);
});

app.get('/', (req, res) => {
  res.json({ message: '🚀 Backend funcionando! Use /login para testar' });
});

app.listen(5500, () => {
  console.log('===================================');
  console.log('🚀 BACKEND RODANDO NA PORTA 5500!');
  console.log('===================================');
  console.log('📧 Email de teste: teste@exemplo.com');
  console.log('🔑 Senha de teste: 123456');
  console.log('👉 Teste: http://localhost:5500');
  console.log('===================================');
});