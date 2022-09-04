const User = require('../models/User')
const { createError } = require('../utils/error');
// GET ALL
const getUsers = async (req, res,next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
// GET BY ID
const getUser = async (req, res, next) => {
    // const failed = true;
    // if(failed) return next(createError(401, "You are not authenticated"));
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}
// CREATE
const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (error) {
        next(error)
    }
}
// UPDATE
const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, 
            {new: true} // reload new data
        )
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}
// DELETE
const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id
        )
        res.status(200).json("User has been delete")
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}