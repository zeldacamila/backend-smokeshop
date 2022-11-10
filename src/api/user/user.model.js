const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  nameUser: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
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

const User = model('User', userSchema)

module.exports = User