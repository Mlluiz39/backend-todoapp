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
    const { user_id } = req.params
    const { title, description } = req.body

    const user = await User.findByPk(user_id, {
      include: { association: 'tasks' },
    })

    await user.update({ title, description })

    return res.json(user)
  }

  async delete(req, res) {
    const { user_id } = req.params
    const { id } = req.body

    const user = await User.findByPk(user_id)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const task = await Task.findByPk(id)

    await user.destroy(task)

    return res.send()
  }
}

module.exports = new TaskController()
