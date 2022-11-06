const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }]
  }, {
    timestamps: true,
    versionKey: false
  }
)

const Product = model('Product', productSchema)

module.exports = Product