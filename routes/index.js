var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");


router.get("/", indexController.home);
router.get('/products', indexController.productos )
router.get('/login' , indexController.login )
module.exports = router;