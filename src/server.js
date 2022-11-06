require('dotenv').config()
const express = require('express');
const { connect } = require('./db');
const userRoute = require('./api/user/user.route')

const app = express();
const port = 8081;
connect();

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/auth', userRoute)

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`)
})