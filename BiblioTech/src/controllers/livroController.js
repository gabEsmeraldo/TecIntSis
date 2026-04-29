const dotenv = require('dotenv').config();
const supabase = require('./config/database')

getLivros = async (req, res) => {
  const { data, error } = await supabase
    .from("livro")
    .select("*");
  if (error) return [];
  return data;
};

getLivrosByID = async (req, res) => {
    let { livroId } = req.params;
    const { data, error } = await supabase
        .from("livro")
        .select("*")
        .eq("id", livroId);
  if (error) return null;
  return data;
};

createLivro = async (req, res) => {
    const { data, error } = await supabase
        .from("livro")
        .require("titulo", "autor")
        .insert(req.body);
  if (error) return null;
  return data;
};



module.exports = {
    getLivros,
    getLivrosByID,
    createLivro
};