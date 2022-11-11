require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const { connect } = require('./db');
const userRoute = require('./api/user/user.route')
const productRoute = require('./api/product/product.route')
const publicationRoute = require('./api/publication/publication.route')
const { transporter, verify } = require('./utils/mailer')

const app = express();
const port = 8081;
connect();

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(morgan('dev'))
app.use(express.json())
verify(transporter)

app.use('/auth', userRoute)
app.use('/api/products', productRoute)
app.use('/api/publications', publicationRoute)

app.listen(port, () => {
  console.log(`Successfully running at port: ${port}`)
})