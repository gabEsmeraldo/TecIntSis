const express = require('express');
const dotenv = require('dotenv').config();
const supabase = require('./config/database')

const app = express();

app.use(express.json());

getLivros = async (req) => {
  const { data, error } = await supabase
    .from("livro")
    .select("*");
  if (error) return [];
  return data;
}

getLivrosByID(req) = async (req) => {
  const { data, error } = await supabase
    .from("livro")
    .select("*")
    .eq("id", req.params.id);
  if (error) return null;
  return data;
};

createLivro(req)

module.exports = {
  getLivros
};