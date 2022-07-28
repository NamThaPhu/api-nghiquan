const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb+srv://nam:2155128662001N%40m@cluster0.34tqnyv.mongodb.net/nghiquan');
        console.log('Connect to DB: ', true)
    }
    catch (e) {
        console.error(e.message)
    }
}