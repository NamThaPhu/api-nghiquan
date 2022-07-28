// services
const {
    createCategory,
    readCategory,
    readCategories,
    updateCategory,
    deleteCategory
} = require('../services/category.service')

module.exports = {
    // [POST] /
    createCategory: async (req, res, next) => {
        try {
            res.json({
                data: await createCategory({
                    data: {
                        ...req.body
                    }
                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [GET] /:id
    readCategory: async (req, res, next) => {
        try {
            res.json({
                data: await readCategory({
                    id: req.params.id
                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [GET] /
    readCategories: async (req, res, next) => {
        try {
            res.json({
                data: await readCategories({

                })
            })
        }
        catch (e) {
            next(e)
        }
    },

    // [PUT] /:id
    updateCategory: async (req, res, next) => {
        try {
            res.json({
                data: await updateCategory({
                    id: req.params.id,
                    data: {
                        ...req.body
                    }
                })

            })
        }
        catch (e) {
            next(e)
        }
    },

    // [DELETE] /:id
    deleteCategory: async (req, res, next) => {
        try {
            res.json(
                await deleteCategory({
                    id: req.params.id
                })
            )
        }
        catch (e) {
            next(e)
        }
    },
}