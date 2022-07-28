const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('Category', categorySchema)