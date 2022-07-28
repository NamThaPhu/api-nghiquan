// models
const Product = require('../models/product.model')
const Category = require('../models/category.model')
const Type = require('../models/type.model')

// services

// utils
const difference = require('../utils/difference')

module.exports = {
    // create
    createProduct: async ({
        data
    }) => {
        try {
            const product = await Product.create(data)
            await Category.updateMany({ _id: product.categories }, { $push: { products: product._id } })
            await Type.updateOne({ _id: product.type }, { $push: { products: product._id } })

            return product
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // read
    readProduct: async ({
        id
    }) => {
        try {
            const product = await Product.findById({ _id: id })
                .populate({
                    path: 'categories types',
                    select: '-products -__v'
                })

            return product
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // reads
    readProducts: async ({

    }) => {
        try {
            const products = await Product.find({})
                .populate({
                    path: 'categories types',
                    select: '-products -__v'
                })

            return products
        }

        catch (e) {
            console.error(e.message)
        }
    },

    // update
    updateProduct: async ({
        id,
        data
    }) => {
        try {
            const _id = id;
            const product = data

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

            return newProduct
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // delete
    deleteProduct: async ({
        id
    }) => {
        try {
            const product = await Product.deleteOne({ _id: id })
            await Category.updateMany({ _id: product.categories }, { $pull: { products: product._id } })
            await Type.updateOne({ _id: product.type }, { $pull: { products: product._id } })

            return product
        }
        catch (e) {
            console.error(e.message)
        }
    },

    // search
    searchProduct: async ({
        keyword
    }) => {
        try {
            const params = {
                keyword: keyword || '',
            }

            // const pd = await Product.find({ $text: { $search: params.keyword } })

            // // tìm kiếm theo danh mục
            // const category = await Category.findById({ _id: params.id })
            //     .populate({
            //         path: 'products',
            //         select: '-__v -categories',
            //         populate: {
            //             path: 'type',
            //             select: '-__v -products'
            //         }
            //     })

            // tìm kiếm theo từ khóa
            const pd = (await Product.find({})).filter((item) => {
                return item.name.toLowerCase().indexOf(params.keyword.toLowerCase()) !== -1
            })

            // res.json({ result: resultKeyword.length, data: resultKeyword })

            return pd
        }
        catch (e) {
            console.error(e.message)
        }
    }
}