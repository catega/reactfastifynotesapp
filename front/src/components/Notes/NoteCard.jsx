import { useContext, useState } from "react"
import { NoteContext } from "../../contexts/NoteContext"

const NoteCard = ({note}) => {
    const {deleteNote, updateNote} = useContext(NoteContext)
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)

    const sendNote = () => {
        const newNote = {
            title,
            text
        }
        updateNote(newNote, note._id)
        setEditMode(!editMode)
    }

    return (
        <>
            {!editMode 
            ? 
                <>
                    <h2>{note.title}</h2>
                    <p>{note.text}</p>
                </>
            : 
                <>
                    <input onChange={e => setTitle(e.target.value)} value={title} type="text" />
                    <textarea onChange={e => setText(e.target.value)} value={text} />
                </>
            }
            
            {
                !editMode
                ?
                    <>
                        <button onClick={() => deleteNote(note._id)}>Eliminar</button>
                        <button onClick={() => setEditMode(!editMode)}>Editar</button>
                    </>
                :
                    <>
                        <button onClick={() => setEditMode(!editMode)}>Cancelar</button>
                        <button onClick={sendNote}>Guardar</button>
                    </>
            }
        </>
    )
}

export default NoteCard