const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/Usuarios.json');

const usersController = {
    register : (req,res) => {
        res.render ('register')
    },
    login : (req,res) => {
        res.render ('login')
    },
    registrateUser: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
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
		let changeUser = JSON.stringify(users, null, '  ');
		fs.writeFileSync(usersFilePath, changeUser);
		res.redirect('/');
    }
}

module.exports = usersController