const mongoose = require('mongoose')
const { Schema } = mongoose;

const typeSchema = new Schema({
    name: { type: String, required: true },
    // property: [{ type: String, required: true }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
    versionKey: false,
    // timestamps: false
})

module.exports = mongoose.model('Type', typeSchema)