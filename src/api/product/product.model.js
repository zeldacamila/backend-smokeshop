const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    collectionName: {
      type: String,
      required: true,
      enum: ['Vapos', 'Bongs', 'Grinders', 'Candelas', "Pa' Enrolar", 'Pipas', 'Para tu cultivo', 'Accesorios', 'Productos CBD', 'Combos'],
    },
    price: {
      type: Number,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    }
  }, {
    timestamps: true,
    versionKey: false
  }
)

const Product = model('Product', productSchema)

module.exports = Product