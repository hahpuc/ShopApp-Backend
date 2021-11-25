const mongoose = require("mongoose")
const Message = require("../models/message")
const StatusCode = require('../common/StatusCode');
const bcrypt = require("bcryptjs");

//#region Send Message
const sendMessage = async (idUser, idRoom, message) =>{

    const newMessage = new Message({
        idRoom: idRoom,
        idUser: idUser,
        message: message,
    })

    const Messagesend = await newMessage.save().catch(()=>{
        return null
    })

    return Messagesend
}
//#endregion

module.exports = {
    sendMessage,
}