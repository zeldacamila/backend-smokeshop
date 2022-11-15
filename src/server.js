//require('dotenv').config() /*Solo en local*/
const express = require('express');
//const morgan = require('morgan'); /*Solo en local*/
const cors = require('cors'); 
const { connect } = require('./db');
const userRoute = require('./api/user/user.route')
const productRoute = require('./api/product/product.route')
const publicationRoute = require('./api/publication/publication.route')
const { transporter, verify } = require('./utils/mailer')
const formData = require('./utils/formData')

const app = express();
const port = process.env.PORT || 8081
connect();

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

//app.use(morgan('dev')) /*Solo en local*/
app.use(express.json())
verify(transporter)

app.post("/", formData, (req, res) => {
  console.log("Succesfully")
})

app.use('/auth', userRoute)
app.use('/api/products', productRoute)
app.use('/api/publications', publicationRoute)

app.listen(port, () => {
  console.log(`Successfully running at port: ${port}`)
})