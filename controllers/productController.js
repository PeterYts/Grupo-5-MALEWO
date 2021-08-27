const productController = {
    product: (req,res) => { 
        res.render ('product-detail');
    },
    create: (req,res) => {
        res.render('new-product');
    },
    modify: (req, res) => {
        res.render('modify-product')
    }
}
module.exports = productController;