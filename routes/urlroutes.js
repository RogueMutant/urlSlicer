const express = require('express')
const router = express.Router()
const {getUrl, createUrl} = require('../controllers/urlController.js')

router.get('/:urlId', getUrl)
router.post('/original', createUrl)
module.exports = router 