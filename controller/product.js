import Product from '../models/product.js'

export const createProduct = async (req, res) => {
    const product = Product(req.body)

    try {
        await product.save()

        res.status(201).json({
            code: 201,
            message: "Create new product successfully",
            data: product,
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message,
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        if (page <= 0) {
            return res.status(200).send({ error: true, message: "invalid page number" });
        }

        const option = {
            page: parseInt(page),
            limit: parseInt(limit)
        }

        var products = await Product.paginate({}, option);
        res.status(200).json({
            code: 200,
            message: "Get products successfully",
            data: products,
        })

    } catch (error) {
        res.status(404).json({
            code: 404,
            message: error.message,
        })
    }
}

export const getProductByCategory = async (req, res) => {
    const categoryId = req.body.categoryId

    if (!categoryId) {
        return res.status(404).json({
            code: 404,
            message: "All fill must be required",
        })
    }

    try {
        let products = await Product.find({ categoryId: categoryId })
        if (products) {
            res.status(200).json({
                code: 200,
                message: "Get products successfully",
                data: products,
            })
        }
        else {
            res.status(200).json({
                code: 200,
                message: "Empty product",
                data: products,
            })
        }
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message,
        })
    }
}