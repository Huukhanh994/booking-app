const router = require('express').Router();
const {createUser,getUsers,getUser,updateUser,deleteUser} = require('../controllers/user');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');


// middleware verifyToken
// router.get('/checkauthentication', verifyToken , (req, res, next) => {
//     res.send("Hello user, you are logged in");
// })

// router.get('/checkuser/:id', verifyUser , (req, res, next) => {
//     res.send("Hello user, you are logged in and you can delete your account");
// })

// router.get('/checkadmin/:id', verifyAdmin , (req, res, next) => {
//     res.send("Hello ADMIN, you are logged in and you can delete your account");
// })
// GET ALL
router.get('/', verifyAdmin, getUsers)
// GET BY ID
router.get('/:id', verifyUser, getUser)
// CREATE
router.post('/',verifyUser, createUser)
// UPDATE
router.put('/:id',verifyUser, updateUser)
// DELETE
router.delete('/:id',verifyUser, deleteUser)
module.exports = router