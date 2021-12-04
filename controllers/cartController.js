const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const cartController = {
    compras : (req, res) => {
        res.render('compras');
    },
    saveProduct: (req, res) => {
        db.Products.findByPk(req.params.id).then((product) => {
            let productFound = product.dataValues
            let quantity = req.body.quantity
            if (req.session.userLogged == undefined) {
                res.redirect('/login')
            }else 
                req.session.cart.push({
                    productFound,
                    quantity
                })
                console.log(req.session.cart);
                res.redirect('/compras')
        })
    }
}

module.exports = cartController