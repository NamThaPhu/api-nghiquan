const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'active' },
    modifiedOn: { type: Date, default: Date.now() },
    products: Array,
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('Cart', cartSchema)