const jwt = require('jsonwebtoken')
const Admin = require('../api/admin/admin.model')

const isAdminAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    console.log(authorization)
    if (!authorization) {
      throw new Error('Authorization is required')
    }
    const [_, token] = authorization.split(' ')
    const { id } = jwt.verify(token, process.env.SECRET_KEY)
    req.admin = id
    const admin = await Admin.findById(id)
    if (!admin) {
      throw new Error('Token has expired')
    }
    next()
  } catch (err) {
    res.status(403).json({ message: 'Administrator is not authenticated' })
  }
}

module.exports = { isAdminAuthenticated }