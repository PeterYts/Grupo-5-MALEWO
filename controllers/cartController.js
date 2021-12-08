const session = require('express-session');
const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const cartController = {
    compras : (req, res) => {
        let products = req.session.cart
        let totalPrice = 0;
        req.session.cart.forEach((product) => {
            totalPrice += product.productFound.Price * product.quantity;
        })
        res.render('compras', {products: products, total: totalPrice});
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
                res.redirect('/products')
        })
    },
    confirmedBuy: async (req, res) => {
        if(req.session.cart == undefined) {
            res.send('error')
        }else {
            const order = new db.Orders({
                total: 0,
                userId: req.session.userLogged.id
            })
            const product = await db.Products.findByPk(1)
            order.save();
            order.addProducts(product);
            // req.session.cart.forEach((product) => {
            //     order.total += product.productFound.Price * product.quantity;
            //     order.addProducts(product.productFound.id);
            // })
            // order.save();
            // db.Orders.create({
            //     total: lastPrice,
            //     userId: req.session.userLogged.id,
            // })
        }
    }
}

module.exports = cartController