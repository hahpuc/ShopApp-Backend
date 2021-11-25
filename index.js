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
const {creatRoom} = require('./controller/room')
const {sendMessage} = require('./controller/message');

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
    
    socket.on("disconnect", ()=>{
        console.log("disconnect "+socket.id)
    })

    console.log(socket.adapter.rooms)

    socket.on("join-room",async (idUser1, idUser2)=>{
        const idRoom = await creatRoom(idUser1, idUser2)
        if(!idRoom)
            socket.emit('send-client',{notifi: "Cant join room now"})
        else{
            socket.join(idRoom)
            socket.phong = idRoom
            console.log(socket.adapter.rooms)
        }
    })

    socket.on("leave-room",(data)=>{
        socket.leave(data)
        console.log(socket.adapter.rooms)
    })

    socket.on("send-server", async(idUser, msg) =>{
        const newMessage = await sendMessage(idUser, socket.phong, msg)
        if(!newMessage)
            socket.emit('send-client',{notifi: "Cant send message now"})
        else
            //socket.broadcast.to(id).emit('test2',msg)
            io.of('/chat').to(socket.phong).emit('send-client',newMessage)
    })
})
