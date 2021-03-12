const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const morgan = require('morgan');
const connectDB = require('./db/conn')
connectDB()
const Register = require('./models/register')
const path = require("path")
const hbs = require("hbs")
const app = express();
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "public")

// to setup the view engine
app.set("view engine", "hbs")



// to set up the static directory
app.use(express.static(publicPath))

// to convert json in string
app.use(express.json());

// to convert form data 
app.use(express.urlencoded({ extended: false }))

// using morgan
app.use(morgan('dev'));

// all the authenticaton routes
const loginroutes = require('./api/routes/logincustom')


const adminroutes = require('./api/routes/admin')
const addpetroutes = require('./api/routes/addpet')
// const paymentroutes = require('./api/routes/payment')
//admin side api
const petroutes = require('./api/routes/pet')

// customer side api


// for health check
// for custom log in
app.use('/', loginroutes);

// for google log in
// app.use('/', googleroutes);

// for facebook login
// app.use('/', facebookroutes)
// for admin log in 
app.use('/', adminroutes)

// for admin to add books
app.use('/', addpetroutes)

// for payment
// app.use('/', paymentroutes)

// for getting list of all product:
app.use('/', addpetroutes)

// for getting all the orders made:

// app.use("/cats",require("./models/cats"));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
app.get("/",(req,res)=>{
    res.redirect("/homepage")
})

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})