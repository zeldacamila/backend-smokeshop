const { Schema, model } = require('mongoose')

const publicationSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    author: {
      type: String
    },
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

const Publication = model('Publication', publicationSchema)

module.exports = Publication