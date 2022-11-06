const { Schema, model } = require('mongoose')

const collectionSchema = new Schema(
  {
    nameCollection: {
      type: String,
      required: true,
      Enum: ['Vapos', 'Bongs', 'Grinders', 'Candelas', "Pa' Enrolar", 'Pipas', 'Para tu cultivo', 'Accesorios', 'Productos CBD', 'Combos'],
    },
    products: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    }
  }
)

const Collection = model('Collection', collectionSchema)

module.exports = Collection
