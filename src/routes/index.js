const typeRouter = require('./type.router')
const categoryRouter = require('./category.router')
const productRouter = require('./product.router')
const homeRouter = require('./home.router')

function route(app) {
    app.use('/types', typeRouter)
    app.use('/categories', categoryRouter)
    app.use('/products', productRouter)
    app.use('/', homeRouter)
}

module.exports = route
