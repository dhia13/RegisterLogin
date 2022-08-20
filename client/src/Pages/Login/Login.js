import { useState, useEffect } from 'react'
import { LoginAction } from '../../Redux/Actions/UserActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Register/InputValidation'
import axios from 'axios'

function Login() {
    //Redirect logged users to home
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Logged = useSelector(state => state.UserReducer.Parameters.Logged)
    useEffect(() => {
        if (Logged) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [Logged, navigate])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const errors = ['Please Fill in all fields', 'Wrong credentials']
    const [loading, setLoading] = useState(false)
    const [err0, setErr0] = useState(false)
    const [err1, setErr1] = useState(false)
    console.log(err0, err1)
    const handleSubmit = async e => {
        e.preventDefault()
        setErr0(false)
        setErr1(false)
        if (isEmpty(email) || isEmpty(password))
            setErr0(true)
        else {
            setLoading(true)
            await axios.post('http://localhost:8000/login', {
                email: email, password: password
            })
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('UserInfo', JSON.stringify(response.data.data))
                        localStorage.setItem('token', JSON.stringify(response.data.token))
                        dispatch(LoginAction(response.data.data))
                        setLoading(false)
                    }
                })
                .catch(error => {
                    setErr1(true)
                    setLoading(false)
                })
        }
    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <form onSubmit={handleSubmit} className='relative'>
                        <div className='relative'>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-10 relative"
                                name="email"
                                placeholder="Email" />
                        </div>
                        <div className='relative'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-10"
                                name="password"
                                placeholder="Password" />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1 mb-2"
                        >{loading ? <div>Loading</div> : <p>Login</p>}
                        </button>
                        <div className='flex flex-col absolute m-auto text-red-600 w-[200px] justify-center items-center'>
                            {err0 && <div>
                                <p className='absolute m-auto text-red-600 w-full'>{errors[0]}</p>
                            </div>}
                            {err1 && <div>
                                <p className='absolute m-auto text-red-600 w-full'>{errors[1]}</p>
                            </div>}
                        </div>
                    </form>
                    <div className="text-center text-sm text-grey-dark mt-12">
                        By Login , you agree to the .
                        <Link className="no-underline border-b border-grey-dark text-grey-dark" to="#">
                            Terms of Service
                        </Link> and .
                        <Link className="no-underline border-b border-grey-dark text-grey-dark" to="#">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p className='mt-4 pb-2 pr-1'>Don't have an account?</p>
                    <Link to='/register' className='text-blue-800 mt-4 pb-2'> Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login