const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const saveRoom = await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId, {
            $push: {rooms: saveRoom._id}
        });
        res.status(200).json("Create room successfully");
    } catch (error) {
        next(error)
    }
}
// GET BY ID
const getRoom = async (req, res, next) => {
    // const failed = true;
    // if(failed) return next(createError(401, "You are not authenticated"));
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (err) {
        next(err);
    }
}
// UPDATE
const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, 
            {new: true} // reload new data
        )
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
}
// DELETE
const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id
        )
        res.status(200).json("Room has been delete")
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createRoom,
    getRooms,
    getRoom,
    deleteRoom,
    updateRoom,
}