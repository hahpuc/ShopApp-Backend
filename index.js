import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import postRoutes from './routes/post.js';
import userRoutes from './routes/users.js';
import categoriesRoutes from './routes/categories.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import notificationRoutes from './routes/notification.js';

import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(express.json({ limit: '25mb', extended: true }));
app.use(cors());
app.use(morgan('short'));

app.use('', postRoutes);
app.use('', userRoutes);
app.use('', categoriesRoutes);
app.use('', productRoutes);
app.use('', cartRoutes);
app.use('', notificationRoutes);

app.get('/', (req, res) => {
    res.send("Hello to my API")
})

// MongoDB 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on PORT: ', PORT)))
    .catch((error) => console.log(error.message));


mongoose.set('useFindAndModify', false);