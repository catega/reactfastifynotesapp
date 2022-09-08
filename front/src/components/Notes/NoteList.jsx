import NoteCard from "./NoteCard";

const NoteList = ({notes}) => {
    return (
        <div className="note-list">
            <h1>Notes</h1>
            {notes.length === 0 
            ? 'No hay notas' 
            : notes.map(note => {
                return (
                    <div key={note._id}>
                        <NoteCard note={note}/>
                    </div>
                )
            })}
        </div>
    )
}

export default NoteList