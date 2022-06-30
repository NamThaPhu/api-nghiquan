const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
    versionKey: false,
    // timestamps: false
    // toJSON: { virtuals: true },
    // id: false,
    // toObject: { virtuals: true }
})

// categorySchema.virtual('products', {
//     ref: 'Product',
//     localField: '_id',
//     foreignField: 'categories',
// })

module.exports = mongoose.model('Category', categorySchema)