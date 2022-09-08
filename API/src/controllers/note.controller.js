const Note = require('../models/note.model')

const getNotes = async (req, rep) => {
    rep.send(await Note.find())
}

const getUserNotes = async (req, rep) => {
    rep.send(await Note.find({userId: req.params.id}))
}

const getNote = async (req, rep) => {
    try {
        const note = await Note.findById(req.params.id)
        rep.send(note)
    } catch (err) {
        rep.code(404).send({message: 'Note not found'})
    }
}

const saveNote = async (req, rep) => {
    const newNote = new Note(req.body)
    await newNote.save()

    rep.send(await Note.find({userId: newNote.userId}))
}

const deleteNote = async (req, rep) => {
    const note = await Note.findById(req.params.id)
    await Note.findByIdAndDelete(req.params.id)
    rep.send(await Note.find({userId: note.userId}))
}

const updateNote = async (req, rep) => {
    await Note.findByIdAndUpdate(req.params.id, req.body)
    const newNote = req.body
    rep.send(await Note.find({userId: newNote.userId}))
}

module.exports = {
    getNotes,
    getUserNotes,
    getNote,
    saveNote,
    deleteNote,
    updateNote
}