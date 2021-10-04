const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/Products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
	index: (req, res) => {	
		res.render('products', {productList: products});

	},
    product: (req,res) => { 
		let wantedProduct = products.filter(obj => obj.id == req.params.id);
        res.render ('product-detail', {prod: wantedProduct});
		
		
    },
    create: (req,res) => {
        res.render('new-product');
    },
    edit: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let wantedProduct = products.filter(obj => obj.id == req.params.id);
        res.render('modify-product', {wantedProduct: wantedProduct});
    },
    createProduct: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let newProduct = req.body
		newProduct['Image'] = req.file.filename;
		if (products.length === 0) {
			newProduct['id'] = 1;
			products.push(newProduct);
		}else {
			let lastProduct = products[products.length -1];
			newProduct['id'] = lastProduct.id + 1;
			products.push(newProduct);
		}
		let changeProduct = JSON.stringify(products, null, '  ');
		fs.writeFileSync(productsFilePath, changeProduct);
		res.redirect('/');
    },
    editProduct: (req, res) => {
		let idProduct = parseInt(req.params.id);
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.forEach(obj => {
			if(obj.id === idProduct) {
				obj.Nombre = req.body.Nombre;
				obj.Precio = req.body.Precio;				
				obj.Descripcion = req.body.Descripcion;
				obj.Category = req.body.Category;
				if (req.file) {
					let indexProduct = products.findIndex(obj => obj.id === idProduct);
					let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
					fs.unlink(imagePath, function (err) {
						if (err) throw err;
					});
					product.image = req.file.filename;
					}
				}
			}
		);
		let changeProduct = JSON.stringify(products, null, '  ');
		fs.writeFileSync(productsFilePath, changeProduct);
		res.redirect('/products/');
    },
	managment: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('productManagment', {products: products});
	},
	managmentResponse: (req, res) => {
		if (req.body.action == 'edit') {
			res.redirect('/products/product/' + req.body.id + '/edit');
		} else if (req.body.action == 'delete') {
			let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			products = products.filter(obj => (obj.id == req.body.id)? false : true);
			let changeProduct = JSON.stringify(products, null, '  ');
			fs.writeFileSync(productsFilePath, changeProduct);
			res.redirect('/products/managment');
		} else {
			res.send('error')
		}
	},
    deleteProduct: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products = products.filter(obj => (obj.id == req.params.id)? false : true);
		let changeProduct = JSON.stringify(products, null, '  ');
		fs.writeFileSync(productsFilePath, changeProduct);
		res.redirect('/products');
    }
}
module.exports = productController;