const Yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

exports.get = (req, res) => {
  User.find((err, user) => {
    try {
      res.status(201).json(
        user.map(user => {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
          }
        })
      )
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário', err: error })
    }
  })
}

//check token
const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Aceso negado!' })
  }
  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()
  } catch (error) {
    res.status(403).json({ message: 'Token inválido!' })
  }
}

//create a new user

exports.post = async (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string().email().required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  })

  try {
    schema.validateSync(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(404).json({ err: error.errors })
  }

  const { name, email, password, confirmPassword } = req.body

  const userExists = await User.findOne({ email: email })
  if (userExists) {
    return res.status(422).json({ message: 'email já cadastrado!' })
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ message: 'As senhas não conferem!' })
  }

  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const newUser = new User({
    name,
    email,
    password: passwordHash,
  })

  try {
    await newUser.save()

    res.status(201).json({ message: 'Usuário criado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', err: error })
  }
}

exports.put = async (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  })

  try {
    schema.validateSync(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(404).json({ err: error.errors })
  }

  const { name, email, password } = req.body

  const newUser = {
    name,
    email,
    password,
  }

  await User.findOneAndUpdate(
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
  User.findByIdAndDelete({ _id: req.params.id }, user => {
    try {
      res.status(201).json({ message: 'Usuário  excluído com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir usuário', err: error })
    }
  })
}

//Login user

exports.login = async (req, res) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required('O email é obrigatório '),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  })

  const { email, password } = req.body
  try {
    schema.validateSync(req.body, { abortEarly: false })
  } catch (error) {
    return res.status(404).json({ err: error.errors })
  }

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(422).json({ message: 'Senha incorreta' })
  }

  try {
    const secret = process.env.SECRET
    const expiresToken = process.env.EXPIRES_IN

    const token = await jwt.sign({ id: user._id }, secret, {
      expiresIn: expiresToken,
    })
    res.status(201).json({ message: 'Usuário logado com sucesso', token })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao logar usuário', err: error })
  }
}

exports.getById = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }, '-password')
    res.status(201).json({ user })
  } catch (error) {
    res.status(404).json({ message: 'Usuário não encontrado' })
  }

  checkToken()
}
