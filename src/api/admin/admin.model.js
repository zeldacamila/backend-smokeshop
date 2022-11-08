const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
  nameAdmin: {
    type: String,
    required: true
  },
  emailAdmin: {
    type: String,
    required: true
  },
  passwordAdmin: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  news: [
    {
      type: Schema.Types.ObjectId,
      ref: "Publication",
    },
]
}, {
  timestamps: true,
  versionKey: false
})

const Admin = model('Admin', adminSchema)

module.exports = Admin