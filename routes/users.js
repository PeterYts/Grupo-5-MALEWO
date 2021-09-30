var express = require("express");
const path = require('path');
var router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require('multer');

const storage = multer.diskStorage({ 
    destination: 'public/img/userImg', 
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
    
  const upload = multer({ storage: storage })

router.get('/register', usersController.register)
router.get('/login' , usersController.login );
router.post('/register/', upload.single('Image'), usersController.registrateUser)

module.exports = router;
