const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone_number: { type: String, required: true },
        total_address: Number,
        shipping_address: [
            {
                name: String,
                address: String,
                phoneNumber: String,
                isDefault: { type: Boolean, default: false }
            },
        ],
        payment_method: Number,
        role: Number,
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;