const express = require('express')
const { registerUser, authUser,allUsers, } = require('../controllers/userControllers')
// const authUser = require('../controllers/userControllers.js')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()


router.route('/').post(registerUser).get(protect, allUsers)
router.post('/login', authUser)


module.exports = router;
