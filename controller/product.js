const StatusCode = require('../common/StatusCode.js');
const Product = require('../models/product.js');
const cloudinary = require('../utils/cloudinary.js');


const createProduct = async (req, res) => {
    try {

        let pictureFiles = req.files;
        if (!pictureFiles)
            return res.status(StatusCode.PayloadIsInvalid).json({
                code: StatusCode.PayloadIsInvalid,
                error: "No picture attached!"
            });

        var images = [];
        for (const picture of pictureFiles) {
            const uploadResponse = await cloudinary.uploader.upload(picture.path, { folder: "products/" + req.body.name })

            images.push({
                imageUrl: uploadResponse.url,
                cloudinary_id: uploadResponse.public_id
            })
        }

        const product = Product({
            name: req.body.name,
            categoryId: req.body.categoryId,
            price: req.body.price,
            images: images,
            description: req.body.description
        })

        await product.save()

        res.status(StatusCode.CreateSuccessStatus).json({
            code: StatusCode.CreateSuccessStatus,
            data: product,
        })

    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            error: error.message,
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;

        if (page <= 0) {
            return res.status(StatusCode.SuccessStatus).send({ error: true, error: "invalid page number" });
        }

        const option = {
            page: parseInt(page),
            limit: parseInt(limit),
            populate: 'categoryId',
        }

        let products = await Product.paginate({}, option);


        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            message: "Get products successfully",
            products,
        })

    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            error: error.message,
        })
    }
}

const getProductByCategory = async (req, res) => {
    const categoryId = req.body.categoryId

    if (!categoryId) {
        return res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            error: "All fill must be required",
        })
    }

    try {

        const { page, limit } = req.query;

        if (page <= 0) {
            return res.status(StatusCode.SuccessStatus).send({ error: true, message: "invalid page number" });
        }

        const option = {
            page: parseInt(page),
            limit: parseInt(limit),
            populate: 'categoryId',
        }

        let products = await Product.paginate({ categoryId: categoryId }, option);

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
            error: error.message,
        })
    }
}

const getProductById = async (req, res) => {
    const productId = req.params.id

    if (!productId) {
        return res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            error: "All fill must be required",
        })
    }

    try {
        let product = await Product.findById(productId).populate('categoryId')

        if (product) {
            res.status(StatusCode.SuccessStatus).json({
                code: StatusCode.SuccessStatus,
                message: "Get product successfully",
                data: product,
            })
        }
        else {
            res.status(StatusCode.SuccessStatus).json({
                code: StatusCode.SuccessStatus,
                message: "Empty product",
                data: product,
            })
        }
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            error: error.message,
        })
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id
    const { name, price, description, categoryId } = req.body

    // if (!productId || !name || !price || !description || !categoryId) {
    //     return res.status(StatusCode.ResourceNotFound).json({
    //         code: StatusCode.ResourceNotFound,
    //         message: "All fill must be required",
    //     })
    // }

    try {
        let product = await Product.findById(productId).populate('categoryId')

        if (!product) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                error: "Product not found",
            })
        }

        if (name != null) product.name = name
        if (price != null) product.price = price
        if (description != null) product.description = description
        if (categoryId != null) product.categoryId = categoryId

        await product.save()

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            message: "Update product successfully",
            data: product,
        })

    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            error: error.message,
        })
    }
}


module.exports = {
    createProduct,
    getProductByCategory,
    getProducts,
    getProductById,
    updateProduct
}