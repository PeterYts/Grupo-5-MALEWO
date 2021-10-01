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
        res.render ('login')
    },
	loginProcess: (req,res) => {
		res.send(req.body)
	// 	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	// 	let errors = validationResult(req);
	// 	console.log(req.body)

	// 	if (errors.isEmpty()) {
	// 		let userToLogin = User.findByField('email', req.body.email);
	// 		console.log (userToLogin)


	// 	 }//else res.render('login', {errors: errors.mapped(), old: req.body})
	// 	 else console.log(req.body)
	 },
    registrateUser: (req, res) => {	
		console.log (req.body)
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let errors = validationResult(req);
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
    }
}

module.exports = usersController