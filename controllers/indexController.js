var session = require('express-session')
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const indexController = {
    home: (req, res) => {
    console.log(req.session)
      res.render("index", {user : req.session.userLogged});
    },
    productos : (req,res) => {
        res.render ('products')
    },
    info: (req, res) => {
        res.render('quienes-somos');
    },
    blog : (req, res) => {
        res.render('blog');
    }
}

module.exports = indexController