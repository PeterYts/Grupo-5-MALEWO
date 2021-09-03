const productController = {
    product: (req,res) => { 
        res.render ('product-detail');
    },
    create: (req,res) => {
        res.render('new-product');
    },
    edit: (req, res) => {
        res.render('modify-product');
    },
    createProduct: (req, res) => {
        
    },
    editProduct: (req, res) => {

    },
    deleteProduct: (req,res) => {

    }
}
module.exports = productController;