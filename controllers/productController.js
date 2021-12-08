const fs = require('fs');
const path = require('path');
const db = require('../database/models')

// const productsFilePath = path.join(__dirname, '../data/Products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
	index: (req, res) => {	
		db.Products.findAll()
			.then(products => {res.render('products', {productList: products})
		})

	},
    product: (req,res) => { 
		
        db.Products.findByPk(req.params.id, {
			include:[{association:'category'}]
		})
			.then(wantedProduct => res.render ('product-detail', {prod: wantedProduct}))
		
		
    },
    create: (req,res) => {
		console.log(db.Categories)
        db.Categories.findAll()
				.then(function(categories){ 
					return res.render('new-product', {categories: categories});
				}).catch(error => {
					console.log(error)
				})

				
    },
    edit: (req, res) => {
		
		let wantedProduct = db.Products.findByPk(req.params.id)
		let productCategory =db.Categories.findAll()
		Promise.all([wantedProduct,productCategory])
		.then(([wantedProduct,categories])=>{
			res.render('modify-product', {wantedProduct: wantedProduct, categories: categories})
		});
    },
    createProduct: (req, res) => {
        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// let newProduct = req.body
		// newProduct['Image'] = req.file.filename;
		// if (products.length === 0) {
		// 	newProduct['id'] = 1;
		// 	products.push(newProduct);
		// }else {
		// 	let lastProduct = products[products.length -1];
		// 	newProduct['id'] = lastProduct.id + 1;
		// 	products.push(newProduct);
		// }
		// let changeProduct = JSON.stringify(products, null, '  ');
		// fs.writeFileSync(productsFilePath, changeProduct);
		db.Products.create({
			name: req.body.Nombre,
			description: req.body.Descripcion,
			img: req.file.filename,
			categoryId: req.body.category,
			Price: req.body.Price , 


		})
		res.redirect('/');
    },
    editProduct: (req, res) => {
		// let errors = validationResult(req);
		// let updatedProduct = req.body;
		// updatedProduct['img'] = req.file.filename
		db.Products.update({
			name: req.body.Nombre,
			description: req.body.Descripcion,
			img: req.file.filename,
		
		
			categoryId: req.body.category,
			Price: req.body.Price , 


		},{
			where: {
				id:req.params.id
			}
		})
		res.redirect('/products/product/'+ req.params.id);
    },
		// let idProduct = parseInt(req.params.id);
        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// products.forEach(obj => {
		// 	if(obj.id === idProduct) {
		// 		obj.Nombre = req.body.Nombre;
		// 		obj.Precio = req.body.Precio;				
		// 		obj.Descripcion = req.body.Descripcion;
		// 		obj.Category = req.body.Category;
				// if (req.file) {
				// 	let indexProduct = products.findIndex(obj => obj.id === idProduct);
				// 	let imagePath = path.join(__dirname, '../../public/images/products', products[indexProduct].image);
				// 	fs.unlink(imagePath, function (err) {
				// 		if (err) throw err;
				// 	});
				// 	product.image = req.file.filename;
				// 	}
				// }
		// 	}
		// );
		// let changeProduct = JSON.stringify(products, null, '  ');
		// fs.writeFileSync(productsFilePath, changeProduct);
		// res.redirect('/products/');
    // },
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