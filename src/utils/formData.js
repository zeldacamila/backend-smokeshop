const busboy = require("busboy")
const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// const bodyData = {
//   username: "Jhon Doe",
//   file_1: {},
//   file_2: {},
// }

formData = (req, res, next) => {
  let uploadingFile = false
  let uploadingCount = 0

  const done = () => {
    if (uploadingFile) return
    if (uploadingCount > 0) return
    next()
  }

  const bb = busboy({ headers: req.headers })
  console.log('body',req.body)
  req.body = {}

  // Captura de partes que no son un archivo
  bb.on("field", (key, val) => {
    req.body[key] = val
    console.log(req.body)
  })

  // Captura de partes que son archivo
  bb.on("file", (key, stream) => {
    uploadingFile = true
    uploadingCount++
    const cloud = cloudinary.uploader.upload_stream(
      { upload_preset: "smokeshop-preset",
      resource_type: 'auto' },
      (err, res) => {
        if (err) console.log(err)
        //new Error("Something went wrong!")
        
        req.body[key] = res.secure_url
        uploadingFile = false
        uploadingCount--
        done()
      }
    )

    stream.on("data", (data) => {
      cloud.write(data)
    })

    stream.on("end", () => {
      cloud.end()
    })
  })

  bb.on("finish", () => {
    done()
  })

  req.pipe(bb)
}

module.exports = formData