const authMiddleware = require('./app/middlewares/auth')

const { Router } = require('express')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const TaskController = require('./app/controllers/TaskController')

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/users', UserController.show)
routes.get('/users/:id', UserController.index)

routes.post('/users/:user_id/tasks', TaskController.store)
routes.get('/users/:user_id/tasks', TaskController.index)
routes.get('/tasks', TaskController.show)
routes.put('/tasks/:id', TaskController.update)
routes.patch('/tasks/:id', TaskController.updateStatus)
routes.delete('/tasks/:id', TaskController.delete)

module.exports = routes
