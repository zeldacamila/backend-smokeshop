const Publication = require('./publication.model')
const Admin = require('../admin/admin.model')

const uploadPublication = async (req, res) => {
  try {
    const publicationData = req.body
    const id = req.admin
    const admin = await Admin.findById(id)
    const publication = await Publication.create({ ...publicationData, admin: id })
    admin.news.push(publication)
    await admin.save({ validateBeforeSave: false })

    res.status(201).json({ message: 'Publication uploaded successfully', data: publication })
  } catch (err) {
    res.status(400).json({ message: 'Publication cannot be uploaded', data: err })
  }
}

const listPublications = async (req, res) => {
  try {
    const publications = await Publication.find()
    if (publications.length == 0) {
      return res.status(400).json({ message: 'There are no publications'})
    }
    res.status(200).json({ message: 'Publications found', data: publications })
  } catch (err) {
    res.status(400).json({ message: 'Publications not found', data: err })
  }
}

const updatePublication = async (req, res) => {
  try {
    const  { publicationId } = req.params
    const updatedPublication = req.body
    const id = req.admin
    const admin = await Admin.findById(id)
    const publicationUpdated = await Publication.findByIdAndUpdate(publicationId, updatedPublication, {new: true})
    res.status(200).json({ message: 'Publication updated successfully', data: publicationUpdated})
  } catch(err) {
    res.status(404).json({ message: 'Publication could not be updated', data: err})
  }
}

const destroyPublication = async (req, res) => {
  try {
    const { publicationId } = req.params
    const id = req.admin
    const admin = await Admin.findById(id)
    const publication = await Publication.find({_id: publicationId, admin: id})
    const deletedPublication = await Publication.deleteOne(product._id)
    res.status(200).json({ message: 'Publication deleted', data: publication[0].title})
  } catch(err) {
    res.status(404).json({ message: 'Publication does not exist', data: err})
  }
}

module.exports = { uploadPublication, listPublications, destroyPublication, updatePublication }