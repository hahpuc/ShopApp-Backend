import mongoose from 'mongoose'

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
export default RefreshToken;