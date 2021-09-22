import Categories from '../models/categories.js';

export const createCategory = async (req, res) => {

    const isExist = await Categories.findOne({ name: req.body.name });
    if (isExist) {
        return res.status(200).json({
            code: 200,
            message: "Category is exist"
        })
    }

    const newCategory = Categories({
        name: req.body.name
    });

    try {
        await newCategory.save()
        res.status(201).json({
            code: 201,
            message: "Create new category successfully"
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find()

        res.status(200).json({
            code: 200,
            data: categories,
        })
    } catch (error) {
        res.status(404).json({
            code: 404,
            message: error.message
        })
    }
}