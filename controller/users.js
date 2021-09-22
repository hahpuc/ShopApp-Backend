import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.js";

import UserModal from "../models/user.js";
import { createUserCart } from "./cart.js";

// let refreshTokens = [];

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(404).json({
            code: 404,
            message: "User doesn't exist"
        });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({
            code: 400,
            message: "Invalid credentials"
        });

        const token = generateAccessToken({ email: oldUser.email, id: oldUser._id });
        // refreshTokens.push(token.refreshToken)

        const newRefreshToken = new RefreshToken({ token: token.refreshToken });
        await newRefreshToken.save();

        return res.status(200).json({
            code: 200,
            data: {
                result: oldUser,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            },
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            message: error.message
        });
    }
};

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(200).json({
            code: 200,
            message: "User already exists"
        });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        res.status(201).json({
            code: 201,
            data: {
                result,
            },
        });

        createUserCart(result._id);
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        });
    }
};

const generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.AUTH_KEY, { expiresIn: "45s" });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken,
    }
}


export const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) return res.status(401).json({ code: 401, message: "Refresh token was null" });

    const isExistToken = await RefreshToken.findOne({ token: refreshToken });
    if (!isExistToken) return res.status(403).json({ code: 403, message: "Not authentication!" })

    await RefreshToken.findOneAndDelete({ token: refreshToken });

    // if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ code: 401, message: "Not authentication" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) => {
        if (error) return res.status(403).json({ code: 403, message: "Forbidden" })

        console.log(user);
        const token = generateAccessToken({ email: user.email, id: user.id });

        const newRefreshToken = new RefreshToken({ token: token.refreshToken });
        newRefreshToken.save();

        return res.status(200).json({
            code: 200,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        })
    })

}

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModal.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
