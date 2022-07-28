// models
const User = require('../models/user.model')
const Otp = require('../models/otp.model')

// services
const {
    createOtp,
    validOtp
} = require('../services/otp.service')

// untils
module.exports = {

    verifyOtp: async ({
        email,
        otp,
    }) => {
        try {
            const otpHolder = await Otp.find({
                email
            })

            if (!otpHolder) {
                return {
                    code: 404,
                    message: 'Expires OTP'
                }
            }

            // get last otp
            const lastOtp = otpHolder[otpHolder.length - 1]
            const isValid = validOtp({ otp, otpDb: lastOtp.otp })

            if (!isValid) {
                return {
                    code: 401,
                    message: 'Invalid OTP',
                }
            }

            if (isValid && email == lastOtp.email) {
                // create user
                const user = await User.create({
                    username: email,
                    email,
                    password: email,
                    isAdmin: false
                })

                if (user) {
                    // delete many otp in data
                    await Otp.deleteMany({
                        email
                    })
                }

                return {
                    code: 201,
                    message: 'User created successfully'
                }
            }

            return {
                otp: lastOtp.otp,
            }
        }
        catch (e) {
            console.error(e.message)
        }
    },

    registerUser: async ({
        email,
    }) => {
        try {
            const user = await User.findOne({
                email,
            })

            if (user) {
                return {
                    message: 'This email is already registered'
                }
            }

            // create otp random
            const num = Math.floor(Math.random() * (999999 - 100000) + 100000)
            const otp = num.toString()

            return {
                message: 'Create OTP sucessfully',
                result: await createOtp({
                    otp,
                    email,
                })
            }
        }
        catch (e) {
            console.error(e.message)
        }
    }
}