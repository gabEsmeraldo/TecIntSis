const supabase = require("../config/database");

const LIVROS_TABLE = "livros";

const createHttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const getLivroOrThrow = async (id) => {
  const { data, error } = await supabase
    .from(LIVROS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw createHttpError(404, "Livro nao encontrado.");
  }

  return data;
};

const getLivros = async () => {
  const { data, error } = await supabase
    .from(LIVROS_TABLE)
    .select("*")
    .order("titulo", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

const getLivrosByID = async (req) => {
  const { id } = req.params;
  return getLivroOrThrow(id);
};

const createLivro = async (req) => {
  const { titulo, autor, isbn, ano_publicacao, disponivel, resumo } = req.body;

  if (!titulo || !autor) {
    throw createHttpError(400, "Os campos titulo e autor sao obrigatorios.");
  }

  const { data, error } = await supabase
    .from(LIVROS_TABLE)
    .insert({ titulo, autor, isbn, ano_publicacao, disponivel, resumo })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const updateLivro = async (req) => {
  const { id } = req.params;
  const { titulo, autor, isbn, ano_publicacao, disponivel, resumo } = req.body;

  await getLivroOrThrow(id);

  const { data, error } = await supabase
    .from(LIVROS_TABLE)
    .update({
      titulo: titulo ?? null,
      autor: autor ?? null,
      isbn: isbn ?? null,
      ano_publicacao: ano_publicacao ?? null,
      disponivel: disponivel ?? null,
      resumo: resumo ?? null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const updateDisponibilidadeLivro = async (req) => {
  const { id } = req.params;
  const { disponivel } = req.body;

  if (typeof disponivel !== "boolean") {
    throw createHttpError(
      400,
      "O campo disponivel e obrigatorio e deve ser booleano."
    );
  }

  await getLivroOrThrow(id);

  const { data, error } = await supabase
    .from(LIVROS_TABLE)
    .update({ disponivel })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const deleteLivro = async (req) => {
  const { id } = req.params;

  await getLivroOrThrow(id);

  const { error } = await supabase.from(LIVROS_TABLE).delete().eq("id", id);

  if (error) {
    throw error;
  }
};

module.exports = {
  getLivros,
  getLivrosByID,
  createLivro,
  updateLivro,
  updateDisponibilidadeLivro,
  deleteLivro,
};
