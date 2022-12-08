const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/show/users', userController.get)
router.get('/show/:id', userController.getById)
router.get('/show/:id', userController.checkToken)
router.post('/auth/register', userController.post)
router.post('/auth/login', userController.login)
router.put('/:id', userController.put)
router.delete('/:id', userController.delete)
module.exports = router
