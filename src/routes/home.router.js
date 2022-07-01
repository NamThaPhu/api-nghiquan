const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    const info = {
        apiName: 'api-nghiquan',
        author: 'Thái Phương Nam',
        github: 'https://github.com/NamThaPhu',
    }
    res.json(info)
})

module.exports = router
