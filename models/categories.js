const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true, versionKey: false }
)

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;