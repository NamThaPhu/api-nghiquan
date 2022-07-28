const express = require('express')
const router = express.Router()

const controller = require('../controllers/product.controller')

router.get('/search', controller.searchProduct)
router.get('/:id', controller.readProduct)
router.put('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)
router.post('/', controller.createProduct)
router.get('/', controller.readProducts)

module.exports = router
