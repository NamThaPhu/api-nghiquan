const Category = require('../models/category.model')
const Product = require('../models/product.model')

const difference = require('../utils/difference')

class CategoryController {

    // [POST] /
    async createCategory(req, res, next) {
        try {
            let data = { ...req.body }
            const category = await Category.create(data)
            await Product.updateMany({ _id: category.products }, { $push: { categories: category._id } })
            res.json(category)
        }
        catch (err) {
            next(err)
        }
    }

    // [GET] /:id
    async readCategory(req, res, next) {
        try {
            const category = await Category.findById({ _id: req.params.id })
                .populate({
                    path: 'products',
                    select: '-__v -categories',
                    populate: {
                        path: 'type',
                        select: '-__v -products'
                    }
                })
            res.json(category)
        }
        catch (err) {
            next(err)
        }
    }

    // [GET] /
    async readCategories(req, res, next) {
        try {
            const categories = await Category.find({})
                .populate({
                    path: 'products',
                    select: '-__v -categories',
                    populate: {
                        path: 'type',
                        select: '-__v -products'
                    }
                })
            res.json(categories)
        }
        catch (err) {
            next(err)
        }
    }

    // [PUT] /:id
    async updateCategory(req, res, next) {
        try {
            const _id = req.params.id;
            const product = { ...req.body }
            const newCategories = product.products || [];

            const oldProduct = await Category.findById({ _id: _id })
            const oldCategories = oldProduct.products

            Object.assign(oldProduct, product);
            const newProduct = await oldProduct.save();

            const added = difference(newCategories, oldCategories);
            const removed = difference(oldCategories, newCategories);

            await Product.updateMany({ _id: added }, { $push: { categories: _id } })
            await Product.updateMany({ _id: removed }, { $pull: { categories: _id } })
            res.json(newProduct)
        }
        catch (err) {
            next(err)
        }
    }

    // [DELETE] /:id
    async deleteCategory(req, res, next) {
        try {
            const category = await Category.deleteOne({ _id: req.params.id })
            await Product.updateMany({ _id: category.products }, { $pull: { categories: category._id } })
            res.json(category)
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = new CategoryController