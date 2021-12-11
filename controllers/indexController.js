<<<<<<< HEAD
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
=======
const path = require('path')
const db = require('../database/models')

const indexController = {
    home: async (req, res) => {
    let productRooster = await db.Products.findAll({limit: 3});
      res.render("index", {rooster: productRooster});
>>>>>>> 2aa513e65f6c1288d7a58001a0ef954729a6586e
    },
    productos : (req,res) => {
        res.render ('products')
    },
    info: (req, res) => {
        res.render('quienes-somos');
    },
    blog : (req, res) => {
        res.render('blog');
    },
    dashboard: (req, res) => {
        res.sendFile(path.join(__dirname, '../react-dashboard/build/index.html'));
    }
}

module.exports = indexController