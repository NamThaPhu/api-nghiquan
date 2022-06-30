const Product = require('../models/product.model')
const Category = require('../models/category.model')
const Type = require('../models/type.model')

const difference = require('../utils/difference')

class ProductController {

    // [POST] /
    async createProduct(req, res, next) {
        try {
            let data = { ...req.body }
            const product = await Product.create(data)
            await Category.updateMany({ _id: product.categories }, { $push: { products: product._id } })
            await Type.updateOne({ _id: product.type }, { $push: { products: product._id } })
            res.json(product)
        }
        catch (err) {
            next(err)
        }
    }

    // [GET] /:id
    async readProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id)
                .populate({
                    path: 'categories type',
                    select: '-products -__v'
                })
            res.json(product)
        }
        catch (err) {
            next(err)
        }
    }

    // [GET] /
    async readProducts(req, res, next) {
        try {
            const products = await Product.find({})
                .populate({
                    path: 'categories type',
                    select: '-products -__v'
                })
            res.json(products)
        }
        catch (err) {
            next(err)
        }
    }

    // [PUT] /:id
    async updateProduct(req, res, next) {
        try {
            const _id = req.params.id;
            const product = { ...req.body }

            const newCategories = product.categories || []
            const newType = product.type

            const oldProduct = await Product.findById({ _id: _id })
            const oldCategories = oldProduct.categories
            const oldType = oldProduct.type

            Object.assign(oldProduct, product)
            const newProduct = await oldProduct.save()

            const added = difference(newCategories, oldCategories);
            const removed = difference(oldCategories, newCategories);

            // update Category
            await Category.updateMany({ _id: added }, { $push: { products: _id } })
            await Category.updateMany({ _id: removed }, { $pull: { products: _id } })

            // update Type
            await Type.updateOne({ _id: oldType }, { $pull: { products: _id } })
            await Type.updateOne({ _id: newType }, { $push: { products: _id } })

            res.json(newProduct)
        }
        catch (err) {
            next(err)
        }
    }

    // [DELETE] /:id
    async deleteProduct(req, res, next) {
        try {
            const product = await Product.deleteOne({ _id: req.params.id })
            await Category.updateMany({ _id: product.categories }, { $pull: { products: product._id } })
            await Type.updateOne({ _id: product.type }, { $pull: { products: product._id } })
            res.json(product)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = new ProductController