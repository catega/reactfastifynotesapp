import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios'
import { MainContext } from "./MainContext";
import {getToken} from '../utils/axios.config'

export const NoteContext = createContext()

export const NoteContextProvider = (props) => {
    const {user} = useContext(MainContext)
    const [notes, setNotes] = useState(null)

    const getNotes = async () => {
        if (!user) return
        const notes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/n/u/${user._id}`, getToken(user))
        setNotes(notes.data)
    }

    const createNote = async (data) => {
        console.log('[!] New note')
        const newNote = {...data, userId: user._id}
        const notes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/n`, newNote, getToken(user))
        setNotes(notes.data)
    }

    const deleteNote = async (id) => {
        const notes = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/n/${id}`, getToken(user))
        setNotes(notes.data)
    }

    const updateNote = async (newNote, id) => {
        newNote.userId = user._id
        const notes = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/n/${id}`, newNote, getToken(user))
        setNotes(notes.data)
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <NoteContext.Provider value={{notes, deleteNote, createNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}