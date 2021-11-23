const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { ObjectID } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true, },
        categoryId: { type: ObjectID, ref: "Categories", },
        description: { type: String, required: true, },
        price: { type: Number, required: true, },
        images: [
            {
                imageUrl: { type: String },
                cloudinary_id: String
            }
        ],
        sold: { type: Number, default: 0, },
        quantity: { type: Number, default: 0, },
        rating_star: { type: Number, default: 0, },
        reviews: { type: Number, default: 0, }

    },
    { timestamps: true, versionKey: false }
)

productSchema.plugin(mongoosePaginate);

const Products = mongoose.model("Product", productSchema);

module.exports = Products;