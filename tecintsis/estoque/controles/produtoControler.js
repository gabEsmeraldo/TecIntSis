const dotenv = require("dotenv").config();
const supabase = require("../config/database");

const getHello = (req, res) => {
  res.send("Hello World!");
};

const getHello2 = (req, res) => {
  let { nome } = req.params;

  res.send(`Hello World, ${nome}`);
};

const getProdutos = async (req, res) => {
  const { data, error } = await supabase
    .from("produto")
    .select("*")
    .order("id", { ascending: true });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

const store = async (req, res) => {
  const { nome, preco, estoque } = req.body;

  try {
    const { data, error } = await supabase
      .from("produto")
      .insert([{ nome, preco, estoque }])
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).error({ error: error.message });
  }
};

const deleteProduto = async (req, res) => {
  const { produto_id } = req.params;

  try {
    const { data, error } = await supabase  
      .from("produto")
      .delete()
      .eq("id", produto_id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(203).json(data);
  } catch (error) {
    res.status(500).error({ error: error.message });
  }
};

const putProduto = async (req, res) => {
  const { produto_id } = req.params;
  const { id, create_at, nome, descricao, preco, estoque, ativo } = req.body;

  try {
    const { data, error } = await supabase
    .from('produto')
    .update([{ id, create_at, nome, descricao, preco, estoque, ativo }])
    .eq("id", produto_id)
    .select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).error({ error: error.message });
  }
}

const patchProduto = async (req, res) => {
  const { produto_id } = req.params;
  const { descricao } = req.body;

  try {
    const { data, error } = await supabase
      .from("produto")
      .update([{ descricao }])
      .eq("id", produto_id)
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).error({ error: error.message });
  }
};

module.exports = {
  getHello,
  getHello2,
  getProdutos,
  deleteProduto,
  putProduto,
  patchProduto,
  store,
};
