const express = require('express')
const router = express.Router()

const {
    registerUser,
    verifyOtp
} = require('../controllers/user.controller')

router.post('/verifyotp', verifyOtp)
router.post('/', registerUser)

module.exports = router
