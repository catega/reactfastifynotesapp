const {Schema, model} = require('mongoose')

const noteSchema = new Schema({
    title: {
        type: String,
        default: 'Note'
    },
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('Note', noteSchema)