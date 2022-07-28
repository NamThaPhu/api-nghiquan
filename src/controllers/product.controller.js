// services
const {
    createProduct,
    readProduct,
    readProducts,
    updateProduct,
    deleteProduct,
    searchProduct
} = require('../services/product.service')

module.exports = {
    // [POST] /
    createProduct: async (req, res, next) => {
        try {
            res.json({
                data: await createProduct({
                    data: req.body
                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [GET] /:id
    readProduct: async (req, res, next) => {
        try {
            res.json({
                data: await readProduct({
                    id: req.params.id
                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [GET] /
    readProducts: async (req, res, next) => {
        try {
            res.json({
                data: await readProducts({

                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [PUT] /:id
    updateProduct: async (req, res, next) => {
        try {
            res.json({
                data: await updateProduct({
                    id: req.params.id,
                    data: req.body
                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [DELETE] /:id
    deleteProduct: async (req, res, next) => {
        try {
            res.json({
                data: await deleteProduct({
                    id: req.params.id
                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [GET] ?id&keyword
    searchProduct: async (req, res, next) => {
        try {
            res.json({
                data: await searchProduct({
                    keyword: req.params.keyword
                })
            })
        }
        catch (e) {
            next(e)
        }
    }
}