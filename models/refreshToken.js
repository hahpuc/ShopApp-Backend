const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema(
    {
        token: String
    },
    {
        versionKey: false,
        timestamps: true
    },
);


const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
module.exports = RefreshToken;