const userRouter = require('./user.router')
const inventoryRouter = require('./inventory.router')
const typeRouter = require('./type.router')
const categoryRouter = require('./category.router')
const productRouter = require('./product.router')
const homeRouter = require('./home.router')

function route(app) {
    app.use('/users', userRouter)
    app.use('/inventories', inventoryRouter)
    app.use('/types', typeRouter)
    app.use('/categories', categoryRouter)
    app.use('/products', productRouter)
    app.use('/', homeRouter)

    app.use((req, res, next) => {
        // var date_ob = new Date();
        // var day = ("0" + date_ob.getDate()).slice(-2);
        // var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // var year = date_ob.getFullYear();

        // var hours = date_ob.getHours();
        // var minutes = date_ob.getMinutes();
        // var seconds = date_ob.getSeconds();

        // var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        res.status(404).json({
            status: 404,
            message: 'Not found!',
        })
    })

    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            status: 500 || err.status,
            message: err.message,
        })
    })
}

module.exports = route
