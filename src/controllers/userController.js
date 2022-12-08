const Yup = require('yup')
const User = require('../models/UserModel')

exports.get = (req, res) => {
  try {
    User.find({}, user => {
      res.status(201).json({ message: 'Usuário encontrado com sucesso' })

      res.json(
        user.map(user => {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
          }
        })
      )
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', err: error })
  }
}

exports.post = (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email().required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmpassword: Yup.string()
      .required('Passwords must match')
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
  })

  try {
    schema.validateSync(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(400).json({ err: error.errors })
  }

  const { name, email, password, confirmpassword } = req.body

  const newUser = new User({
    name,
    email,
    password,
    confirmpassword,
  })
  User.findOne({ email }).then(email => {
    if (email) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    } else {
      newUser.save(() => {
        try {
          res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
        } catch (error) {
          res
            .status(500)
            .json({ message: 'Erro ao cadastrar usuário', err: error })
        }
      })
    }
  })
}

exports.put = (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
    confirmpassword: Yup.string().required().min(6),
  })

  try {
    schema.validateSync(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(400).json({ err: error.errors })
  }

  const { name, email, password, confirmpassword } = req.body

  const newUser = {
    name,
    email,
    password,
    confirmpassword,
  }

  User.findOneAndUpdate(
    { _id: req.params.id },
    newUser,
    { new: true },
    user => {
      try {
        res.status(201).json({ message: 'Usuário atualizado com sucesso' })
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Erro ao atualizar usuário', err: error })
      }
    }
  )
}

exports.delete = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
    try {
      res.status(201).json({ message: 'Usuário  excluído com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir usuário', err: error })
    }
  })
}
