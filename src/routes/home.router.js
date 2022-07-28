const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    const info = {
        api: 'api-nghiquan',
        author: 'Thái Phương Nam',
    }
    res.json(info)
})

module.exports = router
