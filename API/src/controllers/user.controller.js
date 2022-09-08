const User = require('../models/user.model')

const getUsers = async (req, rep) => {
    rep.send(await User.find())
}

const getUser = async (req, rep) => {
    try {
        const user = await User.findById(req.params.id)
        rep.send(user)
    } catch (err) {
        rep.code(404).send({message: 'User not found'})
    }
}

const loginUser = async (req, rep) => {
    const {username, password} = req.body
    let user = await User.findOne({username})

    if (!user) {
        rep.code(500).send({message: 'User not found'})
        return
    }

    const matchPassword = await req.server.bcrypt.compare(password, user.password)

    if (!matchPassword) {
        rep.code(500).send({message: 'Incorrect credentials'})
        return
    }

    user = await User.findOne({username}, {password: 0})

    const token = req.server.jwt.sign(user)
    user.token = token

    rep.send(user)
}

const saveUser = async (req, rep) => {
    const user = await User.findOne({username: req.body.username})

    if (user) {
        rep.code(500).send({message: 'Username already in use'})
        return
    }

    const newUser = new User(req.body)

    const passEncrypt = await req.server.bcrypt.hash(newUser.password)
    newUser.password = passEncrypt
    await newUser.save()

    rep.code(201).send(newUser)
}

const deleteUser = async (req, rep) => {
    await User.findByIdAndDelete(req.params.id)
    rep.send(await User.find())
}

const updateUser = async (req, rep) => {
    if (req.body._id !== req.params.id) {
        rep.code(500).send({message: 'Permission required'})
    }

    const newUser = await User.findByIdAndUpdate(req.body, req.params.id, {new: true})
    rep.send(newUser)
}

module.exports = {
    getUsers,
    getUser,
    loginUser,
    saveUser,
    deleteUser,
    updateUser
}