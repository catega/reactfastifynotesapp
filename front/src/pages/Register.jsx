import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MainContext } from "../contexts/MainContext"
import {useForm} from 'react-hook-form'

const Register = () => {
    const {registerUser, registerMessage, registerOk} = useContext(MainContext)
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()

    const sendRegister = (data) => {
        registerUser(data)
    }

    useEffect(() => {
        if (registerOk)
            navigate('/login')
    }, [registerOk])

    return (
        <div className="register">
            {registerMessage ? <p>{registerMessage}</p> : ''}
            <form onSubmit={handleSubmit(sendRegister)}>
                <input 
                aria-invalid={errors.username ? 'true' : 'false'}
                {...register('username', {required: 'Username is required', minLength: 3, maxLength: 25})}
                type="text" 
                />
                <input 
                aria-invalid={errors.password ? 'true' : 'false'}
                {...register('password', {required: 'Password is required', minLength: 8})}
                type="password" 
                />
                <input 
                aria-invalid={errors.email ? 'true' : 'false'}
                {...register('email', {required: 'Email is required', 
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                }})}
                type="email" 
                />
                <button>Registrarse</button>
            </form>
        </div>
    )
}

export default Register