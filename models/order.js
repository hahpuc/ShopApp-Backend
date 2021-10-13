const mongoose = require('mongoose');

const { ObjectID } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema(
    {
        status: [
            {
                type: Number,
                description: String,
                time: Date,
            }
        ],
        name: String,
        phone_number: String,
        shipping_address: String,
        total_money: Number,
        payment_method: Number,
        items: [
            {
                productId: { type: ObjectID, ref: "Product", },
                name: String,
                price: Number,
                quantity: Number,
            }
        ],
        order_time: Date,
        payment_time: Date,
        ship_time: Date,
        completed_time: Date,
    },
    {
        versionKey: false,
        timestamps: true
    },
);


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;