const Inventory = require('../models/inventory.model')

module.exports = {
    // add Product
    addInventory: async (inventory) => {
        return await Inventory.create(inventory)
    }
}