const mongoose = require('mongoose');

const { ObjectID } = mongoose.Schema.Types;

const fcmTokenSchema = mongoose.Schema(
    {
        devices: [
            {
                _id: Number,
                fcm_token: String,
            }
        ]
    },
    {
        versionKey: false,
    },
);


const FcmToken = mongoose.model("FcmToken", fcmTokenSchema);
module.exports = FcmToken;