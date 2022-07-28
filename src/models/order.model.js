const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    // shipping: Object,
    // payment: Object,
    products: Array,
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('Order', orderSchema)