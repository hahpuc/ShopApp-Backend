const mongoose = require('mongoose');

const { ObjectID } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema(
    {
        order_code: String,
        status_code: Number,
        status_list: [
            {
                _id: Number,
                description: String,
                time: Date,
            }
        ],
        userId: { type: ObjectID, ref: "User", },
        name: String,
        email: String,
        phone_number: String,
        shipping_address: String,
        total_money: Number,
        payment_method: Number,
        paid: Boolean,
        items: [
            {
                productId: { type: ObjectID, ref: "Product", },
                quantity: Number,
            }
        ],
        order_time: { type: Date, default: null },
        payment_time: { type: Date, default: null },
        ship_time: { type: Date, default: null },
        completed_time: { type: Date, default: null },
        cancel_time: { type: Date, default: null }
    },
    {
        versionKey: false,
        // timestamps: true
    },
);


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;