const express = require('express')
const cors = require('cors');

const route = require('./routes')
const { connect: connectDatabase } = require('./config/database')

// connect database
connectDatabase()

const app = express()
const port = process.env.PORT || 3000

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use(cors({
    origin: '*'
}))

route(app)

app.listen(port, () => {
    console.log('http://localhost:' + port)
})
