const express = require('express');
const Hotel = require('../models/Hotel')
const {createHotel,getHotels,getHotel,updateHotel,deleteHotel,countByCities,countByTypes} = require('../controllers/hotel')
const router = express.Router();
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

// GET ALL
router.get('/', verifyAdmin, getHotels)
// Count by cities
router.get('/countByCities', countByCities)
// Count by types
router.get('/countByTypes', countByTypes)
// GET BY ID
router.get('/:id',verifyUser, getHotel)
// CREATE
router.post('/',verifyAdmin, createHotel)
// UPDATE
router.put('/:id',verifyAdmin, updateHotel)
// DELETE
router.delete('/:id',verifyAdmin, deleteHotel)
module.exports = router;