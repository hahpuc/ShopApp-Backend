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

mongoose.connection.on("connected", () => {
    console.log("Connected to DB")
})

mongoose.connection.on("error", (err) => {
    console.log("error", err)
})

mongoose.set('useFindAndModify', false);

const server = app.listen(PORT, () => console.log('Server running on PORT:',PORT))

// Chat
const io = require("socket.io")(server)

io.of('/chat').on("connection", async(socket)=>{
    console.log("connection " + socket.id)
    
    socket.broadcast.emit('test2',"hello "+socket.id)

    socket.on("disconnect", ()=>{
        console.log("disconnect "+socket.id)
    })

    socket.on("send-server", (msg,id) =>{
        console.log({msg,id})
        socket.join(id)
        io.emit('send-client',msg)
    })

    // socket.on("send-server",async msg=>{
    //     const iot = await io.fetchSockets()
    //     console.log(msg)
    //     console.dir(iot,{depth:null})
    //     socket.broadcast.emit('test1',msg)
    //     socket.emit('test1', msg)
    // })
})
