const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: { type: String, required: true },
    price: {
        capital: { type: Number, min: 0 },
        default: { type: Number, required: true, min: 0 },
        salesOff: { type: Number, min: 0 },
    },
    quantity: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    description: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
}, {
    versionKey: false,
    // timestamps: false
})

module.exports = mongoose.model('Product', productSchema)