const express = require('express')
const router = express.Router()

const Todo = require('../models/Todo')

router.post('/novo', (req, res) => {
  const newTodo = new Todo({
    description: req.body.description,
    done: req.body.done,
  })

  router.get('/', (req, res) => {
    Todo.find()
      .then(todos => res.json(todos))
      .catch(error => res.status(404).json({ notodosfound: 'No todos found' }))
  })

  router.put('/editar/:id', (req, res) => {
    const novosTodos = {
      description: req.body.description,
      done: req.body.done,
    }

    Todo.findOneAndUpdate({ _id: req.params.id }, novosTodos, { new: true })
      .then(carro => {
        res.json(carro)
      })
      .catch(error => res.status(500).json(error))
  })

  router.delete('/delete/:id', (req, res) => {
    Todo.findOneAndDelete({ _id: req.params.id })
      .then(todo => {
        res.json(todo);
      })
      .catch(error => res.status(500).json(error));
  });
  

  newTodo
    .save()
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

module.exports = router
