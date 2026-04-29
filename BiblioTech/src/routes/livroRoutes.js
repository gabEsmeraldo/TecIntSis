import controller from "../controllers/livroController";

app.get("/livros", async (req, res) => {
    const livros = await controller.getLivros(req, res);
    res.json(livros);
});

app.get("/livros/:id", async (req, res) => {
    const livro = await controller.getLivrosByID(req);
    if (!livro) return res.status(404).json();
    res.json(livro);
});

app.post("/livros", async (req, res) => {
    const livro = await controller.createLivro(req);
    if (!livro) return res.status(400).json();
    res.json(livro);
});
