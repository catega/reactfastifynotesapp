import '../App.css'
import {useNavigate} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { MainContext } from '../contexts/MainContext'
import { NoteContext } from '../contexts/NoteContext'
import NoteList from '../components/Notes/NoteList'
import NoteForm from '../components/Notes/NoteForm'

function App() {
  const {notes} = useContext(NoteContext)
  const {user} = useContext(MainContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <div className="App">
      <NoteForm />
      {
        !notes ? 'Cargando...' : <NoteList notes={notes}/>
      }
    </div>
  )
}

export default App
