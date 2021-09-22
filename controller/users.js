import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";
import { createUserCart } from "./cart.js";

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

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.AUTH_KEY, { expiresIn: "1h" });

        res.status(200).json({
            code: 200,
            data: {
                result: oldUser,
                token
            },
        });
    } catch (err) {
        res.status(400).json({
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

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.AUTH_KEY, { expiresIn: "1h" });

        res.status(201).json({
            code: 201,
            data: {
                result,
                token
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

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModal.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
