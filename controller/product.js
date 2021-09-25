import { StatusCode } from '../common/StatusCode.js'
import Product from '../models/product.js'

export const createProduct = async (req, res) => {
    const product = Product(req.body)

    try {
        await product.save()

        res.status(StatusCode.CreateSuccessStatus).json({
            code: StatusCode.CreateSuccessStatus,
            message: "Create new product successfully",
            data: product,
        })
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message,
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        if (page <= 0) {
            return res.status(StatusCode.SuccessStatus).send({ error: true, message: "invalid page number" });
        }

        const option = {
            page: parseInt(page),
            limit: parseInt(limit)
        }

        var products = await Product.paginate({}, option);
        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            message: "Get products successfully",
            data: products,
        })

    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            message: error.message,
        })
    }
}

export const getProductByCategory = async (req, res) => {
    const categoryId = req.body.categoryId

    if (!categoryId) {
        return res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            message: "All fill must be required",
        })
    }

    try {
        let products = await Product.find({ categoryId: categoryId })
        if (products) {
            res.status(StatusCode.SuccessStatus).json({
                code: StatusCode.SuccessStatus,
                message: "Get products successfully",
                data: products,
            })
        }
        else {
            res.status(StatusCode.SuccessStatus).json({
                code: StatusCode.SuccessStatus,
                message: "Empty product",
                data: products,
            })
        }
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message,
        })
    }
}