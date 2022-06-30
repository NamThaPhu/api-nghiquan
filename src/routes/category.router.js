const express = require('express')
const router = express.Router()

const controller = require('../controllers/category.controller')

router.post('/', controller.createCategory)
router.get('/', controller.readCategories)
router.get('/:id', controller.readCategory)
router.put('/:id', controller.updateCategory)
router.delete('/:id', controller.deleteCategory)

module.exports = router
