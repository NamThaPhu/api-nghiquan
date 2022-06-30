const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://nam:2155128662001N%40m@cluster0.34tqnyv.mongodb.net/nghiquan');
        console.log("Connected to MongoDB successfully!!!")
    } catch (error) {
        console.log("Connected to MongoDB failed: " + error)
    }
}

module.exports = { connect }