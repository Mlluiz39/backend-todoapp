const Task = require('../models/Task')

class TaskController {
  async store(req, res) {
    const { title, description } = req.body

    const task = await Task.create({ title, description })

    return res.json(task)
  }

  async index(req, res) {
    const tasks = await Task.findAll()

    return res.json(tasks)
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
