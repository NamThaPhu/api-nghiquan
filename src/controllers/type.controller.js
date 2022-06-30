const Type = require('../models/type.model')
const Product = require('../models/product.model')

class TypeController {

    // [POST] /
    async createType(req, res, next) {
        try {
            let data = { ...req.body }
            const type = await Type.create(data)
            res.json(type)
        }
        catch (err) {
            next(err)
        }
    }

    // [GET] /:id
    async readType(req, res, next) {
        try {
            const type = await Type.findById(req.params.id)
                .populate({
                    path: 'products',
                    select: '-__v -type',
                    populate: {
                        path: 'categories',
                        select: '-__v -products'
                    }
                })
            res.json(type)
        }
        catch (err) {
            next(err)
        }
    }

    // [GET] /
    async readTypes(req, res, next) {
        try {
            const types = await Type.find({})
                .populate({
                    path: 'products',
                    select: '-__v -type',
                    populate: {
                        path: 'categories',
                        select: '-__v -products'
                    }
                })
            res.json(types)
        }
        catch (err) {
            next(err)
        }
    }

    // [PUT] /:id
    async updateType(req, res, next) {
        try {
            const type = await Type.updateOne({ _id: req.params.id }, req.body)
            res.json(type)
        }
        catch (err) {
            next(err)
        }
    }

    // [DELETE] /:id
    async deleteType(req, res, next) {
        try {
            const type = await Type.deleteOne({ _id: req.params.id })
            // await Product.({ _id: type.products }, { type: null })
            res.json(type)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = new TypeController