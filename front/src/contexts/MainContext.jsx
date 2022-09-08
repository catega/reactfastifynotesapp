import { createContext, useState } from "react";
import axios from 'axios'

export const MainContext = createContext()

export const MainContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [registerOk, setRegisterOk] = useState(false)
    const [registerMessage, setRegisterMessage] = useState('')

    const login = async (data) => {
        try {
            const user = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, data)
            setUser(user.data)
            setIsLogged(true)
            setLoginError('')
            axios.defaults.headers.common['Authorization'] = user.token
        } catch (err) {
            if (err.response.status === 500) {
                setLoginError(err.response.data.message)
            }
        }
    }

    const registerUser = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, data)
            setRegisterOk(true)
            setRegisterMessage('User registered. Now Log in')
        } catch (err) {
            if (err.response.status === 500) {
                setRegisterMessage(err.response.data.message)
            }
        }
    }

    return (
        <MainContext.Provider value={{user, isLogged, login, loginError, registerUser, registerMessage, registerOk}}>
            {props.children}
        </MainContext.Provider>
    )
}