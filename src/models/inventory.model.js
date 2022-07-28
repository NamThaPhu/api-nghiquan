const { Schema, model } = require('mongoose')

const inventorySchema = new Schema({
    quantity: Number,
    // reservations: Array,
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('Inventory', inventorySchema)