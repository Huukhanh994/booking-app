const { createRoom,getRooms, updateRoom, getRoom, deleteRoom } = require('../controllers/room');
const { verifyAdmin } = require('../utils/verifyToken');

const express = require('express');
const router = express.Router();
router.get('/', verifyAdmin, getRooms)
router.post('/:hotelId', verifyAdmin, createRoom)
router.put('/:id',verifyAdmin, updateRoom)
router.get('/:id',verifyAdmin, getRoom)
router.delete('/:id',verifyAdmin, deleteRoom)
module.exports = router