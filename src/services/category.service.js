// models
const Category = require('../models/category.model')
const Product = require('../models/product.model')
// services

// utils
const difference = require('../utils/difference')

module.exports = {
    // create
    createCategory: async ({
        data,
    }) => {
        try {
            const category = await Category.create(data)
            await Product.updateMany({ _id: category.products }, { $push: { categories: category._id } })

            return category
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // read
    readCategory: async ({
        id
    }) => {
        try {
            const category = await Category.findById({ _id: id })
                .populate({
                    path: 'products',
                    select: '-__v -categories',
                    populate: {
                        path: 'type',
                        select: '-__v -products'
                    }
                })

            return category
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // reads
    readCategories: async ({

    }) => {
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

            return categories
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // update
    updateCategory: async ({
        id,
        data
    }) => {
        try {
            const _id = id
            const product = data
            const newCategories = product.products || [];

            const oldProduct = await Category.findById({ _id: _id })
            const oldCategories = oldProduct.products

            Object.assign(oldProduct, product);
            const newProduct = await oldProduct.save();

            const added = difference(newCategories, oldCategories);
            const removed = difference(oldCategories, newCategories);

            await Product.updateMany({ _id: added }, { $push: { categories: _id } })
            await Product.updateMany({ _id: removed }, { $pull: { categories: _id } })

            return newProduct
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // delete
    deleteCategory: async ({
        id
    }) => {
        try {
            const category = await Category.deleteOne({ _id: id })
            await Product.updateMany({ _id: category.products }, { $pull: { categories: category._id } })

            return category
        }
        catch (e) {
            console.error(e.message)
        }
    }
}