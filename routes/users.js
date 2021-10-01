var express = require("express");
const path = require('path');
var router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require('multer');
const { check } = require('express-validator')

const storage = multer.diskStorage({ 
    destination: 'public/img/userImg', 
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
    
const upload = multer({ storage: storage })

let validationsRegister = [
  check('name')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({max: 16}).withMessage('maximo 16 caracteres'),
  check('email')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isEmail().withMessage('Este campo debe ser un Email'),
  check('tel')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isNumeric().withMessage('Ingrese num de telefono valido').bail()
    .isLength({min: 14}, {max: 15}),
  check('password')
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({max: 16}).withMessage('maximo 16 caracteres').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
];
let validationLogin = [
  check('email')
  .notEmpty().withMessage('Este campo es obligatorio').bail()
  .isEmail().withMessage('Este campo debe ser un Email'),
  check('password')
    .notEmpty().withMessage('Este campo es obligatorio').bail()

]

router.get('/register', usersController.register)
router.get('/login' , usersController.login );
router.post('/login',validationLogin, usersController.loginProcess)
router.post('/register/', upload.single('Image'), validationsRegister, usersController.registrateUser)

module.exports = router;
