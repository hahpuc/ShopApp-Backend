const mongoose = require("mongoose")
const Room = require("../models/room")
const StatusCode = require('../common/StatusCode');
const bcrypt = require("bcryptjs");

//#region Create Room
const creatRoom = async (idUser1, idUser2) =>{

    const room = await Room.findOne({$or:[
        {user1: idUser1},
        {user1: idUser2}
    ],$or: [
        {user2: idUser1},
        {user2: idUser2}]
    })
    if(room)
        return room.id
    const newRoom = new Room({
        user1: idUser1,
        user2: idUser2
    })

    const room1 = await newRoom.save().catch(()=>{
        return null
    })
    return room1.id
}
//#endregion

module.exports = {
    creatRoom,
}