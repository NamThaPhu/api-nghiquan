const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    const info = {
        author: 'Thái Phương Nam',
        nickName: 'NamThaPhu',
        apiName: 'api-nghiquan',
        documents: [
            {
                name: product,
                path: 'https://api-nghiquan.herokuapp.com/products',
            },
            {
                name: category,
                path: 'https://api-nghiquan.herokuapp.com/categories',
            },
        ]
    }
    res.json(info)
})

module.exports = router
