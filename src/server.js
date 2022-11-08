require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const { connect } = require('./db');
const userRoute = require('./api/user/user.route')
const adminRoute = require('./api/admin/admin.route')
const productRoute = require('./api/product/product.route')
const publicationRoute = require('./api/publication/publication.route')

const app = express();
const port = 8081;
connect();

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/auth', userRoute)
app.use('/adminauth', adminRoute)
app.use('/api/products', productRoute)
app.use('/api/publications', publicationRoute)

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`)
})