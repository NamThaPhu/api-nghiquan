// services
const {
    registerUser,
    verifyOtp,
} = require('../services/user.service')

module.exports = {

    verifyOtp: async (req, res, next) => {
        try {
            const {
                email,
                otp
            } = req.body

            const result = await verifyOtp({
                email,
                otp
            })

            return res.json(result)
        }
        catch (e) {
            next(e)
        }
    },

    registerUser: async (req, res, next) => {
        try {
            const {
                email,
            } = req.body

            const {
                message,
                result
            } = await registerUser({
                email,
            })

            return res.json({
                message,
                result
            })
        }
        catch (e) {
            next(e)
        }
    }
}