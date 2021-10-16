const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const userRoutes = require('./routes/users.js');
const categoriesRoutes = require('./routes/categories.js');
const productRoutes = require('./routes/product.js');
const cartRoutes = require('./routes/cart.js');
const notificationRoutes = require('./routes/notification.js');
const orderRoutes = require('./routes/order.js');
const fcmTokenRoutes = require('./routes/fcmToken.js');


const app = express();
dotenv.config();

app.use(express.json({ limit: '25mb', extended: true }));
app.use(express.urlencoded({
    extended: true
}));


app.use(cors());
app.use(morgan('short'));

app.use('', userRoutes);
app.use('', categoriesRoutes);
app.use('', productRoutes);
app.use('', cartRoutes);
app.use('', notificationRoutes);
app.use('', orderRoutes);
app.use('', fcmTokenRoutes)

app.get('/', (req, res) => {
    res.send("Hello to my API")
})

// MongoDB 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on PORT: ', PORT)))
    .catch((error) => console.log(error.message));


mongoose.set('useFindAndModify', false);