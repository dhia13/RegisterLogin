import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty, isEmail, isLength, isMatch } from './InputValidation'
import axios from 'axios'

function Register() {
    const navigate = useNavigate()
    const Logged = useSelector(state => state.UserReducer.Parameters.Logged)
    useEffect(() => {
        if (Logged) {
            navigate('/')
        }
    }, [Logged, navigate])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const error = [
        "Please fill in all fields.",
        "Invalid emails.",
        "Password must be at least 6 characters.",
        "Password did not match.",
        "Email already registred"
    ]
    const [err0, setErr0] = useState(false)
    console.log(`fields err ${err0}`);
    const [err1, setErr1] = useState(false)
    const [err2, setErr2] = useState(false)
    const [err3, setErr3] = useState(false)
    const [err4, setErr4] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async e => {
        setErr0(false)
        setErr1(false)
        setErr2(false)
        setErr3(false)
        setErr4(false)
        e.preventDefault()
        if (isEmpty(name) || isEmpty(password) || isEmpty(confirmPassword) || isEmpty(email))
            setErr0(true)
        else {
            setErr0(false)
            if (!isEmail(email))
                setErr1(true)
            else {
                setErr1(false)
            }
            if (isLength(password))
                setErr2(true)
            else {
                setErr2(false)
            }
            if (!isMatch(password, confirmPassword))
                setErr3(true)
            else {
                setErr3(false)
            }
            if (!err1 && !err2 && !err3 && !err0) {
                setLoading(true)
                await axios.post('http://localhost:8000/register', {
                    name: name, email: email, password: password
                }).then(response => {
                    setInterval(() => {
                        navigate('/ConfirmEmail')
                    }, 1000);
                }).catch(error => {
                    setLoading(false)
                    setErr4(true)
                })
            }

        }
    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={handleSubmit} className='relative'>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-10"
                            name="fullname"
                            placeholder="Full Name" />
                        <div className='relative'>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-10 relative"
                                name="email"
                                placeholder="Email" />
                            {err1 && <p className='absolute top-14 pl-2 text-red-400'>{error[1]}</p>}
                            {err4 && <p className='absolute top-14 pl-2 text-red-400'>{error[4]}</p>}
                        </div>
                        <div className='relative'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-10"
                                name="password"
                                placeholder="Password" />
                            {err2 && <p className='absolute top-14 pl-2 text-red-400'>{error[2]}</p>}
                        </div>
                        <div className='relative'>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-10"
                                name="confirm_password"
                                placeholder="Confirm Password" />
                            {err3 && <p className='absolute top-14 pl-2 text-red-400'>{error[3]}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1 mb-2"
                        >{loading ? <p>Loading</p> : <p>Create Account</p>}</button>
                        {err0 && <p className='absolute m-auto text-red-600'>{error[0]}</p>}
                    </form>
                    <div className="text-center text-sm text-grey-dark mt-12">
                        By signing up, you agree to the .
                        <Link className="no-underline border-b border-grey-dark text-grey-dark" to="#">
                            Terms of Service
                        </Link> and .
                        <Link className="no-underline border-b border-grey-dark text-grey-dark" to="#">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p className='mt-4 pb-2'>already have an account?</p>
                    <Link to='/Login' className='text-blue-800 mt-4 pb-2'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register