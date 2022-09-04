const Hotel = require('../models/Hotel.js')
const { createError } = require('../utils/error');
// GET ALL
const getHotels = async (req, res,next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}
// GET BY ID
const getHotel = async (req, res, next) => {
    // const failed = true;
    // if(failed) return next(createError(401, "You are not authenticated"));
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err);
    }
}
// CREATE
const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}
// UPDATE
const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, 
            {new: true} // reload new data
        )
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}
// DELETE
const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id
        )
        res.status(200).json("Hotel has been delete")
    } catch (error) {
        next(error)
    }
}
// COUNT BY CITIES 
const countByCities = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city});
        }));
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}
// COUNT BY TYPES 
const countByTypes = async (req, res, next) => {
    const types = req.query.types.split(",");
    try {
        const hotelCount = await Hotel.countDocuments({type: 'hotel'})
        const apartmentCount = await Hotel.countDocuments({type: 'apartment'})
        const resortCount = await Hotel.countDocuments({type: 'resort'})
        const villaCount = await Hotel.countDocuments({type: 'villa'})
        const cabinCount = await Hotel.countDocuments({type: 'cabin'})
        res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
        ]);
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createHotel,
    getHotels,
    getHotel,
    updateHotel,
    deleteHotel,
    countByCities,
    countByTypes,
}