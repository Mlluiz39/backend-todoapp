const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.get)
router.post('/auth/register', userController.post)
router.put('/:id', userController.put)
router.delete('/:id', userController.delete)
module.exports = router
