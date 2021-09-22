import mongoose from 'mongoose'

const { ObjectID } = mongoose.Schema.Types;

const cartSchema = mongoose.Schema(
    {
        products: [
            {
                productId: { type: ObjectID, ref: "Product", },
                name: String,
                price: Number,
                quantity: Number,
            },
        ],
        amount: {
            type: Number,
            default: 0
        },
    },
    {
        versionKey: false,
        timestamps: true
    },
);


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;