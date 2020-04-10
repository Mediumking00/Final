require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
port = 3000
const app = express()

// middleware section
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))

// import transactions router V1
// const RouterV1 = require('./routes/transactionRoutesV1')
// app.use('/api/v2',RouterV1)

// import transactions router V2
//const RouterV2 = require('./routes/transactionRoutesV2')
//app.use(RouterV2)

// import transactions router V3
const RouterV3 = require('./routes/transactionRoutesV3')
app.use(RouterV3)

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME
app.listen(PORT, HOSTNAME, () => {
  console.log('Connect to Sever complete')
})

app.listen(3000,() => {
  console.log(`server is listening at port: ${port} `)
  
})