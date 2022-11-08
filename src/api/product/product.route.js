const express = require('express')
const { uploadProduct, listProductsByCollection, listProducts, updateProduct, destroyProduct } = require('./product.controller')
const { isAdminAuthenticated } = require('../../middelware/adminauth')

const router = express.Router()

router.post('/', isAdminAuthenticated, uploadProduct)
router.get('/:collection', listProductsByCollection)
router.get('/', listProducts)
router.put('/:productId', isAdminAuthenticated, updateProduct)
router.delete('/:productId', isAdminAuthenticated, destroyProduct)

module.exports = router
