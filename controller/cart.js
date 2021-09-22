import Cart from '../models/cart.js'
import jwt from 'jsonwebtoken'
import Products from '../models/product.js'

// After sign up, each user have 1 cart 
export const createUserCart = async (userId) => {
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

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findById({ _id: req.userId });

        res.status(200).json({
            code: 200,
            data: cart
        })
    } catch (error) {
        res.status(404).json({
            code: 404,
            message: error.message
        })
    }
}

export const addProductIntoCart = async (req, res) => {
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
        res.status(200).json({
            code: 200,
            message: "Added product into cart",
            result: cart
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const deleteProductInCart = async (req, res) => {
    try {
        const cart = await Cart.findById({ _id: req.userId })

        var { productId } = req.body;
        const indexProduct = cart.products.findIndex(product => product._id == productId)

        if (indexProduct != -1) {
            cart.amount -= 1
            cart.products.splice(indexProduct, 1);
        } else {
            return res.status(200).json({
                code: 200,
                message: "Don't have this product in Cart"
            })
        }

        await cart.save()
        res.status(200).json({
            code: 200,
            message: "Deleted product in Cart",
            result: cart
        })

    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}