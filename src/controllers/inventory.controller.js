const {
    addInventory,
} = require('../services/inventory.service')

module.exports = {
    addInventory: async (req, res, next) => {
        try {
            const {
                inventory
            } = req.body

            res.json({
                inventory: await addInventory(inventory)
            })
        }
        catch (e) {
            next(e)
        }
    },
}