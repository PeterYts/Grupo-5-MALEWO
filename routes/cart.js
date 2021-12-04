var express = require("express");
var router = express.Router();
const cartController = require("../controllers/cartController");


router.get('/compras', cartController.compras);
router.post('/saveProductToCart/:id', cartController.saveProduct);



module.exports = router;