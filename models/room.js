const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectID } = mongoose.Schema.Types

const RoomSchema = new Schema({
    user1:{
        type:ObjectID,
        ref: "User",
        required: true
    },
    user2:{
        type:ObjectID,
        ref: "User",
        required: true
    },
    registration_data: {
        type: Date,
        default: Date.now,
    }
})

module.exports = Room = mongoose.model("room", RoomSchema)