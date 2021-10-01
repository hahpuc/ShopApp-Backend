
const StatusCode = require('../common/StatusCode.js');
const Categories = require('../models/categories.js');

const createCategory = async (req, res) => {

    const isExist = await Categories.findOne({ name: req.body.name });
    if (isExist) {
        return res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            message: "Category is exist"
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
            message: error.message
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
            message: error.message
        })
    }
}

module.exports = {
    createCategory,
    getCategories,
}