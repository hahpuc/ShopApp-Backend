const Cart = require('../models/cart.js');
const jwt = require('jsonwebtoken');
const Products = require('../models/product.js');
const StatusCode = require('../common/StatusCode.js');


// After sign up, each user have 1 cart 
const createUserCart = async (userId) => {
    try {
        var products = []
        const newCart = Cart({
            _id: userId,
            products: products,
            amount: 0
        })

        await newCart.save()

    } catch (error) {
        console.log(error);
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findById({ _id: req.userId });

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: cart
        })
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message
        })
    }
}

const addProductIntoCart = async (req, res) => {
    try {
        const cart = await Cart.findById({ _id: req.userId })

        var { productId, quantity } = req.body;
        const indexProduct = cart.products.findIndex(product => product._id == productId)
        const productInfo = await Products.findById({ _id: productId })

        if (indexProduct == -1) {
            cart.amount += 1
            cart.products.push({
                _id: productInfo._id,
                name: productInfo.name,
                price: productInfo.price,
                quantity
            })
        } else {
            cart.products[indexProduct].quantity += quantity
        }

        await cart.save()
        res.status(StatusCode.CreateSuccessStatus).json({
            code: StatusCode.CreateSuccessStatus,
            message: "Added product into cart",
            result: cart
        })
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message
        })
    }
}

const deleteProductInCart = async (req, res) => {
    try {
        const cart = await Cart.findById({ _id: req.userId })

        var { productId } = req.body;
        const indexProduct = cart.products.findIndex(product => product._id == productId)

        if (indexProduct != -1) {
            cart.amount -= 1
            cart.products.splice(indexProduct, 1);
        } else {
            return res.status(StatusCode.SuccessStatus).json({
                code: StatusCode.SuccessStatus,
                message: "Don't have this product in Cart"
            })
        }

        await cart.save()
        res.status(StatusCode.UpdateDeleteSuccess).json({
            code: StatusCode.UpdateDeleteSuccess,
            message: "Deleted product in Cart",
            result: cart
        })

    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message
        })
    }
}

module.exports = {
    createUserCart,
    getCart,
    addProductIntoCart,
    deleteProductInCart
}