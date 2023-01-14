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
    const task = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'id'],
        },
      ],
    })

    return res.json(task)
  }

  async show(req, res) {
    const { id } = req.params

    const task = await Task.findByPk(id)

    return res.json(task)
  }

  async update(req, res) {
    const { id } = req.params
    const { title, description } = req.body

    const task = await Task.findByPk(id)

    await task.update({ title, description })

    return res.json(task)
  }

  async delete(req, res) {
    const { id } = req.params

    const task = await Task.findByPk(id)

    await task.destroy()

    return res.send()
  }
}

module.exports = new TaskController()
