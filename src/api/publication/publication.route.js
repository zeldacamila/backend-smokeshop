const express = require('express')
const { uploadPublication, listPublications, destroyPublication, updatePublication } = require('./publication.controller')
const { isAuthenticated } = require('../../middelware/authentication')
const formData = require('../../utils/formData')

const router = express.Router()

router.post('/', isAuthenticated, formData, uploadPublication)
router.get('/', listPublications)
router.put('/:publicationId', isAuthenticated, updatePublication)
router.delete('/:publicationId', isAuthenticated, destroyPublication)

module.exports = router
