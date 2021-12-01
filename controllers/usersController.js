const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');


const usersFilePath = path.join(__dirname, '../data/Usuarios.json');
const User = require('../models/User');

const usersController = {
    register : (req,res) => {
        res.render ('register')
    },
    login : (req,res) => {
		console.log(req.session)
        res.render ('login')
    },
	loginProcess: (req,res) => {
	 	let errors = validationResult(req);
		 db.Users.findOne({where: {email: req.body.email}}).then((userToLogin) => {
			if (errors.isEmpty()) {
				let passSi = bcrypt.compareSync(req.body.password, userToLogin.password);
   
				if (passSi){
					delete userToLogin.password
					req.session.userLogged = userToLogin;
					if(req.body.remember_user){
						console.log('ttt')
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
					}
					return res.redirect('profile')
				}
				
				else res.render('login', {errors: {email: {msg: 'Las credenciales son inválidas'}}})
   
			 }else res.render('login', {errors: errors.mapped(), old: req.body})
		 })
	 },
    registrateUser: (req, res) => {	
		let errors = validationResult(req);
		db.Users.findAll({where: {email: req.body.email}}).then((userToLogin) => {
			if (userToLogin) {
				res.render('register', {emailError: 'El email ya esta en uso', old: req.body});
			}else 
				if (errors.isEmpty()) {
					let password = bcrypt.hashSync(req.body.password, 12);
					db.Users.create({
						name: req.body.name,
						email: req.body.email,
						img: req.file.filename,
						phone: req.body.tel,
						password: password
					})
					res.redirect('/');
				}else 
					res.render('register', {errors: errors.mapped(), old: req.body});
		})
    },
	profile: (req,res) => {
		console.log('LLEGASTE')
		console.log(req.cookies.userEmail)
		console.log(req.session)
		res.render('loginProfile', {user : req.session.userLogged})
	},
	logout:(req,res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = usersController