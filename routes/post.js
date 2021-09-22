import express from 'express';
import { getPost, getPosts, createPost, deletePost, updatePost } from '../controller/post.js';

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/posts', auth, getPosts);
// router.get('/posts', getPosts);
router.get('/posts/:id', getPost)
router.post('/create_post', createPost);
router.delete('/posts/delete/:id', deletePost)
router.patch('/posts/update/:id', updatePost)
// router.patch('/posts/update/:id', auth, updatePost)

export default router;
