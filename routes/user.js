const router = require('express').Router();
const User = require('../models/User');

router.get('/users', (req,res) => {
  res.status(200).send('Succeso ao entrar no endpoint users');
});

router.post('/users', (req, res) => {
  const { username, email, password } = req.body;
  const role = '';

  res.status(201).send(`Usuário: ${username || ''}, criado com sucesso`);
})

module.exports = router;