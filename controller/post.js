
import mongoose from 'mongoose';


import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postsMessage = await PostMessage.find();

        res.status(200).json(postsMessage);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post)

    try {
        await newPost.save()

        res.status(200).json(newPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await PostMessage.findById({ _id: req.params.id })

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const result = await PostMessage.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            code: 200,
            message: 'Delete post successfully!',
            postData: result,
        })

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);

}