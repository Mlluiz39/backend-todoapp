import Todo from '../schemas/Task'

class TaskController {
  async store(req, res) {
    const { title, description } = req.body

    try {
      const todo = await Todo.create({
        ...req.body,
        user: req.userId,
      })

      if (title === '' || description === '')
        return res.status(400).json({ error: 'Task creation failed' })

      await todo.save()

      return res.status(201).json(todo)
    } catch (error) {
      res.status(400).json({ error: 'Task creation failed' })
    }
  }

  async index(req, res) {
    const todos = await Todo.find().populate('user')

    console.log(req.userId)

    return res.status(200).json(todos)
  }

  async show(req, res) {
    const { id } = req.params

    const todo = await Todo.findById(id).populate('user')

    return res.status(200).json(todo)
  }

  async update(req, res) {
    const { id } = req.params

    const todo = await Todo.findById(id)

    const { title, description, done } = req.body

    todo.title = title
    todo.description = description
    todo.done = done

    await todo.save()

    return res.status(200).json(todo)
  }

  async delete(req, res) {
    const { id } = req.params

    await Todo.findByIdAndDelete(id)

    return res.status(204).send()
  }
}

export default new TaskController()
