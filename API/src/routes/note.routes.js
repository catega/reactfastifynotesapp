const noteController = require('../controllers/note.controller')
const {verifyToken} = require('../middleware/auth.jwt')

const noteRoutes = [
    {
        url: '/n',
        method: 'GET',
        handler: noteController.getNotes
    },
    {
        url: '/n/:id',
        method: 'GET',
        handler: noteController.getNote
    },
    {
        url: '/n/u/:id',
        method: 'GET',
        onRequest: verifyToken,
        handler: noteController.getUserNotes
    },
    {
        url: '/n',
        method: 'POST',
        onRequest: verifyToken,
        handler: noteController.saveNote
    },
    {
        url: '/n/:id',
        method: 'DELETE',
        onRequest: verifyToken,
        handler: noteController.deleteNote
    },
    {
        url: '/n/:id',
        method: 'PUT',
        onRequest: verifyToken,
        handler: noteController.updateNote
    }
]

module.exports = noteRoutes