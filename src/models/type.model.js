const { Schema, model } = require('mongoose')

const typeSchema = new Schema({
    name: { type: String, required: true },
    // property: [{ type: String, required: true }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('Type', typeSchema)