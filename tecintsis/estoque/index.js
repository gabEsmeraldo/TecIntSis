const express = require('express');
const produtoRotas = require('./rotas/produtoRotas')

const app = express();

app.use(express.json());
app.use(produtoRotas);

const porta = process.env.PORTA;

app.listen(porta, () =>{
    console.log(`Servidor em execução, na porta ${porta}`);
})