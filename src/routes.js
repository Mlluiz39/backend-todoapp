import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import TaskController from './app/controllers/TaskController'

import authMiddleware from './app/middlewares/auth'

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

export default routes
