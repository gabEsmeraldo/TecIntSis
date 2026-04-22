const express = require('express');
const produtoController = require('../controles/produtoControler');

const router = express.Router();

router.get("/", produtoController.getHello);
router.get("/hello/:nome", produtoController.getHello2);
router.get("/produtos", produtoController.getProdutos);
router.post("/produtos", produtoController.store);
router.delete("/produtos/:produto_id", produtoController.deleteProduto);
router.put("/produtos/:produto_id", produtoController.putProduto);
router.patch("/produtos/:produto_id", produtoController.patchProduto);

module.exports = router;