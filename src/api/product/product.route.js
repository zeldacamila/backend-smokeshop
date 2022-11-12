const express = require('express')
const { uploadProduct, listProductsByCollection, listProducts, updateProduct, destroyProduct } = require('./product.controller')
const { isAuthenticated } = require('../../middelware/authentication')
const formData = require('../../utils/formData')

const router = express.Router()

router.post('/', isAuthenticated, formData, uploadProduct)
router.get('/:collection', listProductsByCollection)
router.get('/', listProducts)
router.put('/:productId', isAuthenticated, updateProduct)
router.delete('/:productId', isAuthenticated, destroyProduct)

module.exports = router
