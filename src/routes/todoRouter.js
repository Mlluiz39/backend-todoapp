const express = require('express')
const router = express.Router()
const indexBase = require('./index')
const controller = require('../controllers/todoController')

router.get('/',indexBase)
router.get('/show', controller.get)
router.post('/new', controller.post)
router.put('/:id', controller.put)
router.delete('/:id', controller.delete)
module.exports = router
