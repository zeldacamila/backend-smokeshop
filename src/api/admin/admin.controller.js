const Admin = require('./admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupAdmin = async (req, res) => {
  try {
    const { nameAdmin, passwordAdmin, emailAdmin } = req.body
    const passRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    const validatePassword = passRegexp.test(passwordAdmin)
    if (!validatePassword) {
      return res.status(400).json({message: 'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico como *,-, o #'});
    } else {
      const passwordHash = await bcrypt.hash(passwordAdmin, 10)
      const admin = await Admin.create({ nameAdmin, emailAdmin, passwordAdmin: passwordHash })
      const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})
   
      return res.status(201).json(token)
    }
  } catch (err) {
    return res.status(400).json({message: 'Admin cannot be created', data: err})
  }
}

const loginAdmin = async (req, res) => {
  try {
    const { passwordAdmin, emailAdmin } = req.body
    const admin = await Admin.findOne({ emailAdmin })
    if (!admin) {
      throw new Error('Credenciales inválidas')
    }
    const validatePassword = await bcrypt.compare(passwordAdmin, admin.passwordAdmin)
    if (!validatePassword) {
      throw new Error('Credenciales inválidas')
    }
    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
    return res.status(200).json(token)
  } catch (error) {
    return res.status(400).json({message: 'Admin cant login', data: error.message})
  }
}

const destroyAdmin = async (req, res) => {
  try {
    const { adminId } = req.params
    const adminRemoved = await Admin.findByIdAndDelete(adminId)
    res.status(200).json({message: 'Administrator deleted successfully', data: adminRemoved})
  } catch (err) {
    res.status(400).json({message: 'Administrator cannot be deleted', data: err})
  }
}

module.exports = { signupAdmin, loginAdmin, destroyAdmin }