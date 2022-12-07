const Todo = require('../models/TodoModel')

exports.get = (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.send
    }
    res.json(todos)
  })
}

exports.post = (req, res) => {

  const { title, description, done } = req.body

  const newTodo = new Todo({
    title,
    description,
    done,
  })
  newTodo.save((error, todo) => {
    if (error) {
      res.status(500).json(error)
    } else {
      res.json(todo)
    }
  })
}
exports.put = (req, res) => {
  const newTodo = {
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
  }
  Todo.findOneAndUpdate({ _id: req.params.id }, newTodo, { new: true })
    .then(todo => {
      res.json(todo)
    })
    .catch(error => res.status(500).json(error))
}
exports.delete = (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then(todo => {
      res.json(todo)
    })
    .catch(error => res.status(500).json(error))
}
