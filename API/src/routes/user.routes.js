const userController = require('../controllers/user.controller')


const userRoutes = [
    {
        url: '/u',
        method: 'GET',
        handler: userController.getUsers
    },
    {
        url: '/u/:id',
        method: 'GET',
        handler: userController.getUser
    },
    {
        url: '/login',
        method: 'POST',
        handler: userController.loginUser
    },
    {
        url: '/register',
        method: 'POST',
        handler: userController.saveUser
    },
    {
        url: '/u/:id',
        method: 'DELETE',
        handler: userController.deleteUser
    },
    {
        url: '/u/:id',
        method: 'PUT',
        handler: userController.updateUser
    }
]

module.exports = userRoutes