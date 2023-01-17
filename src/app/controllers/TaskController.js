const Task = require('../models/Task')
const User = require('../models/User')

class TaskController {
  async store(req, res) {
    const { user_id } = req.params
    const { title, description } = req.body

    const user = await User.findByPk(user_id)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const task = await Task.create({ title, description, user_id })

    return res.json(task)
  }

  async index(req, res) {
    const { user_id } = req.params

    const user = await User.findByPk(user_id, {
      include: { association: 'tasks' },
    })

    return res.status(200).json(user)
  }

  async show(req, res) {
    const users = await User.findAll({
      include: { association: 'tasks' },
    })

    return res.status(200).json(users)
  }

  async update(req, res) {
    const { id } = req.params
    const { title, description } = req.body

    const task = await Task.findByPk(id)

    if (!task) {
      return res.status(400).json({ error: 'Task not found' })
    }

    await task.update({ title, description })

    return res.status(200).json(task)
  }

  async taskDone(req, res) {
    try {
      const task = await Task.findByPk(req.params.id)
      if (task.done) {
        task.done = false
      } else {
        task.done = true
      }
      console.log(task.done)

      await task.update({ done: task.done })

      return res.status(200).json(task)
    } catch (error) {
      return res.status(400).json({ error: 'Task not found' })
    }
  }

  async delete(req, res) {
    const { id } = req.params

    const task = await Task.findByPk(id)

    if (!task) {
      return res.status(400).json({ error: 'Task not found' })
    }

    await task.destroy()

    return res.status(200).json({ message: 'Task deleted' })
  }
}

module.exports = new TaskController()
