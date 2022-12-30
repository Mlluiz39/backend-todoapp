import { Router } from 'express'

import UserController from './app/controllers/UserController'
import TaskController from './app/controllers/TaskController'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/tasks', TaskController.store)

export default routes
