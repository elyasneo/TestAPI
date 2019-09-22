const express = require('express');
const app = express();
const moragn = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const signupRoutes = require('./api/routes/signup')
const loginRoutes = require('./api/routes/login')

mongoose.connect(process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/TestApi', {
    useNewUrlParser: true,
    authSource: 'admin'
}).then(() => {
    console.log('connected to DB!');

}).catch(err => {
    console.log('Error connecting to DB:' + err.message);

})

app.use(moragn("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
app.use(cors({
    "origin": ["http://192.168.1.110:3000", "http://127.0.0.1:8887"],
    credentials: true,
   // allowedHeaders:['Content-Type', 'Authorization',"Cookie"]
}))

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/signup', signupRoutes)
app.use('/login', loginRoutes)


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        errMsg: err.message
    })
})


module.exports = app;