// 
const express = require('express')
const router = express.Router()

// controllers
const {
    addInventory,
} = require('../controllers/inventory.controller')

// routes
router.post('/', addInventory)

// export
module.exports = router
