
const StatusCode = require('../common/StatusCode.js');
const Categories = require('../models/categories.js');

const createCategory = async (req, res) => {

    const isExist = await Categories.findOne({ name: req.body.name });
    if (isExist) {
        return res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.SuccessStatus,
            error: "Category is exist"
        })
    }

    const newCategory = Categories({
        name: req.body.name
    });

    try {
        await newCategory.save()
        res.status(StatusCode.CreateSuccessStatus).json({
            code: StatusCode.CreateSuccessStatus,
            message: "Create new category successfully"
        })
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            error: error.message
        });
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find()

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: categories,
        })
    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            error: error.message
        })
    }
}

const updateCategory = async (req, res) => {

    try {
        const category = await Categories.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(StatusCode.ResourceNotFound).json({
                code: StatusCode.ResourceNotFound,
                error: "Category is not found"
            })
        }

        category.name = req.body.name;
        var response = await category.save();

        res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            message: "Update category successfully",
            response
        })
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            error: error.message
        });
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory
}