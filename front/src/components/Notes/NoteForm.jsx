import { useContext } from "react"
import { useForm } from 'react-hook-form'
import { NoteContext } from "../../contexts/NoteContext"

const NoteForm = () => {
    const {createNote} = useContext(NoteContext)
    const {register, reset, handleSubmit, formState: {errors}} = useForm()

    const sendNote = (data) => {
        createNote(data)
        reset({
            title: '',
            text: ''
        })
    }

    return (
        <form onSubmit={handleSubmit(sendNote)}>
            <input 
            aria-invalid = {errors.title ? 'true' : 'false'}
            {...register('title', {required: 'Title required', maxLength: 20})} 
            type="text" 
            />
            {errors.title ? <span role={'alert'}>{errors.title.message}</span> : ''}
            <textarea 
            {...register('text', {required: 'Text required', maxLength: 500})} />
            <button>Crear</button>
        </form>
    )
}

export default NoteForm