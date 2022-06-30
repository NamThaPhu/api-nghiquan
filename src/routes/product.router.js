const express = require('express')
const router = express.Router()

const controller = require('../controllers/product.controller')

router.post('/', controller.createProduct)
router.get('/:id', controller.readProduct)
router.get('/', controller.readProducts)
router.put('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

module.exports = router
