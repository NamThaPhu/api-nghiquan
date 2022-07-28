const express = require('express')
const router = express.Router()

const {
    createCategory,
    readCategory,
    readCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller')

router.get('/:id', readCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
router.post('/', createCategory)
router.get('/', readCategories)

module.exports = router
