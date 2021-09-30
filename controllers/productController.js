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
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.forEach(obj => {
				obj.Nombre = req.body.Nombre;
				obj.Precio = req.body.Precio;				
				obj.Descripcion = req.body.Descripcion;
				obj.Category = req.body.Category;
				obj.Image = req.file.filename;
			}
		);
		let changeProduct = JSON.stringify(products, null, '  ');
		fs.writeFileSync(productsFilePath, changeProduct);
		res.redirect('/products/');
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