const express = require('express')
const router = express.Router()

const controller = require('../controllers/type.controller')

router.post('/', controller.createType)
router.get('/', controller.readTypes)
router.get('/:id', controller.readType)
router.put('/:id', controller.updateType)
router.delete('/:id', controller.deleteType)

module.exports = router
