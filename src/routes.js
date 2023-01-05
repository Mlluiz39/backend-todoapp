const authMiddleware = require('./app/middlewares/auth')

const { Router } = require('express')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const TaskController = require('./app/controllers/TaskController')

const routes = new Router()

routes.post('/register', UserController.store)

routes.post('/login', SessionController.store)
routes.get('/users', UserController.index)

routes.use(authMiddleware)

routes.post('/tasks', TaskController.store)
routes.get('/tasks', TaskController.index)
routes.get('/tasks/:id', TaskController.show)
routes.put('/tasks/:id', TaskController.update)
routes.delete('/tasks/:id', TaskController.delete)

module.exports = routes
