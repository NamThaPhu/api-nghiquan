const crypto = require('crypto-js');

// models
const Otp = require('../models/otp.model')
const keySecret = 'itsasecret123'

module.exports = {

    validOtp: ({
        otp, // user enter
        otpDb
    }) => {
        try {
            const otpDecrypt = crypto.AES.decrypt(otpDb, keySecret).toString(crypto.enc.Utf8);
            const isValid = otpDecrypt == otp

            return isValid
        }
        catch (e) {
            console.error(e.message)
        }
    },

    createOtp: async ({
        otp,
        email,
    }) => {
        try {
            // encrypt otp
            console.log('code: ', otp)
            const otpDb = crypto.AES.encrypt(otp, keySecret).toString();
            const result = await Otp.create({
                email,
                otp: otpDb
            })

            return result ? 1 : 0
        }
        catch (e) {
            console.error(e.message)
        }
    }
}