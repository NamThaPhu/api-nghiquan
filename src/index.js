const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors');
const helmet = require('helmet')


const route = require('./routes')
const connectDb = require('./config/database')

// connect database
connectDb()

app.use(helmet())
const port = process.env.PORT || 3000

// chấp nhận tất cả client request
app.use(cors({
    origin: '*',
    // origin: 'https://www.3000h.cf'
}))

// kết nối router cho app
route(app)

app.listen(port, () => {
    console.log('http://localhost:' + port)
})
