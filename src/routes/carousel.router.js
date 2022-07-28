const express = require('express')
const router = express.Router()

const controller = require('../controllers/carousel.controller')

router.post('/', controller.createCarousel)
router.get('/', controller.readCarousel)
router.get('/:id', controller.readCarousel)
router.put('/:id', controller.updateCarousel)
router.delete('/:id', controller.deleteCarousel)

module.exports = router
