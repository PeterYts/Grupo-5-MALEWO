const express = require("express");
const path = require('path');
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require('multer');

const storage = multer.diskStorage({ 
  destination: 'public/images/products', 
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
  
const upload = multer({ storage: storage })

router.get('/create', productController.create);
router.post('/', productController.createProduct);

router.get('/:id', productController.product);

router.get('/:id/edit', productController.edit);
router.put('/:id', upload.any(), productController.editProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
