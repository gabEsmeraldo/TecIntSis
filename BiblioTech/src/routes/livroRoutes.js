import controller from "../controllers/livroController";
app.get("/livros", async (req, res) => {
  res.json(await controller.getLivros(req));
});

app.get("/livros/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("livro")
    .select("*")
    .eq("id", req.params.id);
  if (error) return res.status(400).json();
  res.json(data);
});

app.post("/livros", async (req, res) => {
  const { data, error } = await supabase
    .from("livro")
    .require("titulo", "autor")
    .insert(req.body);
  if (error) return res.status(400).json();
  res.json(data);
});
