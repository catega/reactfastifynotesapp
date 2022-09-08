import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { MainContextProvider } from './contexts/MainContext'
import { NoteContextProvider } from './contexts/NoteContext'
import Layout from './pages/Layout'
import App from './pages/App'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='n' element={
              <NoteContextProvider>
                <App />
              </NoteContextProvider>
            } />
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  </React.StrictMode>
)
