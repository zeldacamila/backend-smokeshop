const Product = require('./product.model')
const User = require('../user/user.model')

const uploadProduct = async (req, res) => {
  try {
    const productData = req.body
    const id = req.user
    const user = await User.findById(id)
    if (user.isAdmin === true) { 
      const product = await Product.create({ ...productData, user: id })
      user.products.push(product)
      await user.save({ validateBeforeSave: false })
      res.status(201).json({ message: 'Product uploaded successfully', data: product })
    }
  } catch (err) {
    res.status(400).json({ message: 'Product cannot be uploaded', data: err.message })
  }
}

const listProductsByCollection = async (req, res) => {
  try {
    const { collection } = req.params
    const products = await Product.find({ collectionName: collection })
    if (products.length == 0) {
      return res.status(400).json({ message: 'There are no products with that collection name'})
    }
    res.status(200).json({ message: 'Products found', data: products })
  } catch (err) {
    res.status(400).json({ message: 'Products not found', data: err })
  }
}

const listProducts = async (req, res) => {
  try {
    const products = await Product.find()
    if (products.length == 0) {
      return res.status(400).json({ message: 'There are no products'})
    }
    res.status(200).json({ message: 'Products found', data: products })
  } catch (err) {
    res.status(400).json({ message: 'Products not found', data: err })
  }
}

const updateProduct = async (req, res) => {
  try {
    const  { productId } = req.params
    const updatedProduct = req.body
    const id = req.user
    const user = await User.findById(id)
    if (user.isAdmin === true) { 
      const productUpdated = await Product.findByIdAndUpdate(productId, updatedProduct, {new: true})
      res.status(200).json({ message: 'Product updated successfully', data: productUpdated})
    }
  } catch(err) {
    res.status(400).json({ message: 'Product could not be updated', data: err})
  }
}

const destroyProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const id = req.user
    const user = await User.findById(id)
    if (user.isAdmin === true) { 
      const product = await Product.find({_id: productId, admin: id})
      const deletedProduct = await Product.deleteOne(product._id)
      res.status(200).json({ message: 'Product deleted', data: product[0].name})
    }
  } catch(err) {
    res.status(404).json({ message: 'Product does not exist', data: err})
  }
}

module.exports = { uploadProduct, listProductsByCollection, listProducts, destroyProduct, updateProduct }