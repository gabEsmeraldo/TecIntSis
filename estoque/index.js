const express = require('express');
const dotenv = require('dotenv').config();
const supabase = require('./config/database')

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello world!');
})

app.get('/produtos', async (req, res) =>{
    const { data, error } = await supabase
                        .from('.produto')
                        .select('*')
                        .order('id', { ascending: true });
    if(error) return res.status(400).json()
})

app.get('/hello/:nome', (req, res) =>{
    let { nome } = req.params;
    res.send(`Hello ${nome}!!!`);
})

const porta = process.env.PORTA;

app.listen(porta, () =>{
    console.log(`Servidor em execução ${porta}`)
})