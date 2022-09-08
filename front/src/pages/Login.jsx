import { useEffect, useContext } from "react"
import {MainContext} from '../contexts/MainContext'
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'

const Login = () => {
    const {isLogged, login, loginError} = useContext(MainContext)
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()

    const sendLogin = (data) => {
        login(data)
    }

    useEffect(() => {
        if(isLogged){
            navigate('/n')
        }
    }, [isLogged])

    return (
        <div className="login">
            <form onSubmit={handleSubmit(sendLogin)}>
                {loginError ? <p>{loginError}</p> : ''}
                <input 
                aria-invalid={errors.username ? 'true' : 'false'} 
                {...register('username', {required: 'User is required'})} 
                type="text" 
                />
                {errors.username ? <span>{errors.username.message}</span> : ''}
                <input 
                aria-invalid={errors.password ? 'true': 'false'} 
                {...register('password', {required: 'Password is required'})} 
                type="password" 
                />
                {errors.password ? <span>{errors.password.message}</span> : ''}
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login