var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

router.get('/product', productController.product);
router.get('/create', productController.create);
router.get('/modify', productController.modify);

module.exports = router
