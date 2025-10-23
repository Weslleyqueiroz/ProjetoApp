import express from 'express';

const app = express();
app.use(express.json());


const services = [
  { id: '1', nome: 'Corte de Cabelo', preco: 30 },
  { id: '2', nome: 'Barba', preco: 20 },
  { id: '3', nome: 'Sobrancelha', preco: 15 },
];
let appointments = [];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });

  if (email === 'teste@exemplo.com' && password === '123456') {
    return res.status(200).json({
      message: 'Login bem-sucedido!',
      user: { email }
    });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});


app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Campos obrigatórios.' });
  
  return res.status(201).json({ message: 'Registro realizado', user: { name, email } });
});


app.get('/services', (req, res) => {
  return res.json(services);
});


app.post('/appointments', (req, res) => {
  const { userEmail, serviceId, date, time } = req.body;
  if (!userEmail || !serviceId || !date || !time) return res.status(400).json({ message: 'Dados incompletos.' });

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

app.listen(8080, () => {
  console.log('Servidor rodando na porta: 8080!');
});