const mongoose = require('mongoose');

const { ObjectID } = mongoose.Schema.Types;

const cartSchema = mongoose.Schema(
    {
        products: [
            {
                productId: { type: ObjectID, ref: "Product", },
                quantity: Number,
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true
    },
);


const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;