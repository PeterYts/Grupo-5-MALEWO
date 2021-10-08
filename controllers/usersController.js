const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');


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
		let userToLogin = User.findByField('email', req.body.email);
	 	if (errors.isEmpty()) {
			 let passSi = bcrypt.compareSync(req.body.password, userToLogin.password);
			 
			 if (passSi){
				 delete userToLogin.password
				 req.session.userLogged = userToLogin;
				 return res.redirect('profile')
			 }
	 		
	 		else res.render('login', {errors: {email: {msg: 'Las credenciales son inválidas'}}})


	 	 }else res.render('login', {errors: errors.mapped(), old: req.body})
	 	 
	 },
    registrateUser: (req, res) => {	
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let errors = validationResult(req);
		let userToLogin = User.findByField('email', req.body.email);
		if (userToLogin) {
			res.render('register', {emailError: 'El email ya esta en uso', old: req.body});
		}else 
			if (errors.isEmpty()) {
				let newUser = req.body
				newUser['Image'] = req.file.filename;
				if (users.length === 0) {
					newUser['id'] = 1;
					users.push(newUser);
				}else {
					let lastUser = users[users.length -1];
					newUser['id'] = lastUser.id + 1;
					users.push(newUser);
				}
				req.body.password = bcrypt.hashSync(req.body.password, 12);
				let changeUser = JSON.stringify(users, null, '  ');
				fs.writeFileSync(usersFilePath, changeUser);
				res.redirect('/');
			}else 
				//res.send(errors.mapped());
				res.render('register', {errors: errors.mapped(), old: req.body});
    },
	profile: (req,res) => {
		console.log('LLEGATE')
		console.log(req.session)
		res.render('loginProfile', {user : req.session.userLogged})
	}
}

module.exports = usersController