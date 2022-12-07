const express = require('express')
const router = express.Router()
const indexBase = require('./index')
const todoController = require('../controllers/todoController')

router.get('/',indexBase)
router.get('/show', todoController.get)
router.post('/new', todoController.post)
router.put('/:id', todoController.put)
router.delete('/:id', todoController.delete)
module.exports = router
