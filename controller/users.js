const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StatusCode = require("../common/StatusCode.js");
const RefreshToken = require("../models/refreshToken.js");

const UserModal = require("../models/user.js");
const { createUserCart } = require("./cart.js");

// let refreshTokens = [];

const generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken,
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(StatusCode.ResourceNotFound).json({
            code: StatusCode.ResourceNotFound,
            message: "User doesn't exist"
        });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: "Invalid credentials"
        });

        const token = generateAccessToken({ email: oldUser.email, id: oldUser._id });
        // refreshTokens.push(token.refreshToken)

        const newRefreshToken = new RefreshToken({ token: token.refreshToken });
        await newRefreshToken.save();

        return res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            data: {
                result: oldUser,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            },
        });
    } catch (error) {
        return res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message
        });
    }
};

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            message: "User already exists"
        });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        res.status(StatusCode.CreateSuccessStatus).json({
            code: StatusCode.CreateSuccessStatus,
            data: {
                result,
            },
        });

        createUserCart(result._id);
    } catch (error) {
        res.status(StatusCode.PayloadIsInvalid).json({
            code: StatusCode.PayloadIsInvalid,
            message: error.message
        });
    }
};

const logout = async (req, res) => {

    // Destory current accesstoken and delete refresh token in Database 

    res.status(200).json({
        code: 200,
        message: "LOGOUT",
    })
}


const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) return res.status(StatusCode.NotAuthentication).json({ code: StatusCode.NotAuthentication, message: "Refresh token was null" });

    const isExistToken = await RefreshToken.findOne({ token: refreshToken });
    if (!isExistToken) return res.status(StatusCode.CannotAccess).json({ code: StatusCode.CannotAccess, message: "Not allow to access!" })

    await RefreshToken.findOneAndDelete({ token: refreshToken });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) => {
        if (error) return res.status(StatusCode.PayloadIsInvalid).json({ code: StatusCode.PayloadIsInvalid, message: "Error" })

        console.log(user);
        const token = generateAccessToken({ email: user.email, id: user.id });

        const newRefreshToken = new RefreshToken({ token: token.refreshToken });
        newRefreshToken.save();

        return res.status(StatusCode.SuccessStatus).json({
            code: StatusCode.SuccessStatus,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        })
    })

}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModal.find();
        res.status(StatusCode.SuccessStatus).json(users);
    } catch (error) {
        res.status(StatusCode.ResourceNotFound).json({ message: error.message })
    }
}

module.exports = {
    signin,
    signup,
    logout,
    refreshToken,
    getAllUsers
}
