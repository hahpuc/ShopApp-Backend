import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'

const { ObjectID } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        categoryId: {
            type: ObjectID,
            ref: "Categories",
        },
        price: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true, versionKey: false }
)

productSchema.plugin(mongoosePaginate);

const Products = mongoose.model("Product", productSchema);

export default Products;