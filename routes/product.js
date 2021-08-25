var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

router.get('/product', (req, res) => {
    res.sendFile(__dirname + '/views/product-detail.html');
});

module.exports = router
