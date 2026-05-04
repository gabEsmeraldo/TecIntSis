const express = require("express");
const controller = require("../controllers/livroController");

const router = express.Router();

const handleError = (res, error, fallbackStatus = 500) => {
  const status = error.status ?? fallbackStatus;

  res.status(status).json({
    error: error.message,
    details: error.details ?? null,
    hint: error.hint ?? null,
  });
};

router.get("/livros", async (req, res) => {
  try {
    const livros = await controller.getLivros();
    res.json(livros);
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/livros/:id", async (req, res) => {
  try {
    const livro = await controller.getLivrosByID(req);
    res.json(livro);
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/livros", async (req, res) => {
  try {
    const livro = await controller.createLivro(req);
    res.status(201).json(livro);
  } catch (error) {
    handleError(res, error, 400);
  }
});

router.put("/livros/:id", async (req, res) => {
  try {
    const livro = await controller.updateLivro(req);
    res.json(livro);
  } catch (error) {
    handleError(res, error, 400);
  }
});

router.patch("/livros/:id", async (req, res) => {
  try {
    const livro = await controller.updateDisponibilidadeLivro(req);
    res.json(livro);
  } catch (error) {
    handleError(res, error, 400);
  }
});

router.delete("/livros/:id", async (req, res) => {
  try {
    await controller.deleteLivro(req);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
