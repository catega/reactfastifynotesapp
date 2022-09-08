const User = require('../models/user.model')
require('dotenv').config()

const verifyToken = async (req, rep, done) => {
    const token = req.headers['authorization']

    if (!token) return rep.code(500).send({message: 'Token required'})

    const decoded = req.server.jwt.verify(token, process.env.TOKEN_KEY)

    const user = await User.findById(decoded._doc._id)

    if (!user) return rep.code(500).send({message: 'Invalid token'})
}

module.exports = {verifyToken}