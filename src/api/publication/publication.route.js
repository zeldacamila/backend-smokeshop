const express = require('express')
const { uploadPublication, listPublications, destroyPublication, updatePublication } = require('./publication.controller')
const { isAdminAuthenticated } = require('../../middelware/adminauth')

const router = express.Router()

router.post('/', isAdminAuthenticated, uploadPublication)
router.get('/', listPublications)
router.put('/:publicationId', isAdminAuthenticated, updatePublication)
router.delete('/:publicationId', isAdminAuthenticated, destroyPublication)

module.exports = router
