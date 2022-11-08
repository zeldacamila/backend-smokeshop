const express = require('express')
const { signupAdmin, loginAdmin, destroyAdmin } = require("./admin.controller")

const router = express.Router()

router.post('/signup', signupAdmin)
router.post('/signin', loginAdmin)
router.delete('/:adminId', destroyAdmin)

module.exports = router