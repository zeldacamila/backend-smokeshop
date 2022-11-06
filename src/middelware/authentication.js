const jwt = require('jsonwebtoken')
const User = require('../api/user/user.model')

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw new Error('Authorization is required')
    }
    // eslint-disable-next-line no-unused-vars
    const [_, token] = authorization.split(' ')
    const { id } = jwt.verify(token, process.env.SECRET_KEY)
    req.user = id
    const user = await User.findById(id)
    if (!user) {
      throw new Error('Token has expired')
    }
    next()
  } catch (err) {
    res.status(403).json({ message: 'User is not authenticated' })
  }
}

module.exports = { isAuthenticated }