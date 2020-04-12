require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// middleware section
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// import transactions router user
const Router = require('./routes/Routes');
app.use(Router);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server is listening at port: ${PORT} `)

})