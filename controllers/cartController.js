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
            }else {
                req.session.cart.push({
                    productFound,
                    quantity
                })
                console.log(req.session.cart);
                res.redirect('/products')
            }
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
            await order.save()
            let ids = [];
            let products = {};
            req.session.cart.forEach((product) => {
                if (ids.includes(product.productFound.id)) {
                    products[product.productFound.id] += Number(product.quantity)
                }else {
                    ids.push(product.productFound.id);
                    products[product.productFound.id] = Number(product.quantity)
                }
                order.total += product.productFound.Price * Number(product.quantity)
            })
            for ( const product in products) {
                order.addProducts(product, {through: {quantity: products[product]}});
            }
            await order.save()
            res.send('funciona');
        }
    },
    deleteItemFromCart: (req, res) => {
        let newCart = req.session.cart.filter(item => item.productFound.id != req.params.id);
        req.session.cart = newCart
        console.log(req.session.cart);
        res.redirect('/compras');
    }
}

module.exports = cartController