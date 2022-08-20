import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isEmpty, isLength, isMatch } from '../Register/InputValidation'

function ChangePassword() {
    //Redirect logged users to home
    const navigate = useNavigate()
    const Logged = useSelector(state => state.UserReducer.Parameters.Logged)
    useEffect(() => {
        if (Logged) {
            navigate('/')
        }
    }, [Logged, navigate])
    const params = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const error = [
        { err: "Please fill in all fields.", },
        { err: "Password must be at least 6 characters.", },
        { err: "Password did not match." }
    ]
    const [err0, setErr0] = useState(null)
    const [err1, setErr1] = useState(false)
    const [err2, setErr2] = useState(false)
    const [serverErr, setServerErr] = useState(false)
    const [serverErrMsg, setServerErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    //request
    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(confirmPassword) || isEmpty(password))
            setErr0(true)
        else {
            setErr0(false)
            if (isLength(password))
                setErr1(true)
            else {
                setErr1(false)
            }
            if (!isMatch(password, confirmPassword))
                setErr2(true)
            else {
                setErr2(false)
            }
            if (!err2 && !err2 && !err0) {
                console.log('request sent')
                await axios.post(`http://localhost:8000/changepassword`, {
                    activation_token: params.token, password
                })
                    .then(response => {
                        setSuccessMsg(response.data.msg)
                        setSuccess(true)
                    }).catch(error => {
                        console.log(error)
                        setServerErr(true)
                        setServerErrMsg(error.response.data.msg)
                    })
            }
        }
    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full relative">
                    <h1 className="mb-8 text-3xl text-center">Reset Password</h1>
                    <form onSubmit={handleSubmit} className='relative'>
                        <div className='relative'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-10"
                                name="password"
                                placeholder="Password" />
                            {err1 ? <p className='absolute top-14 pl-2 text-red-400'>{error[1].err}</p> : <></>}
                        </div>
                        <div className='relative'>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-10"
                                name="confirm_password"
                                placeholder="Confirm Password" />
                            {err2 ? <p className='absolute top-14 pl-2 text-red-400'>{error[2].err}</p> : <></>}
                        </div>
                    </form>
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark
                     focus:outline-none my-1 mb-2" onClick={handleSubmit}>Submit
                    </button>
                    {err0 ? <p className='absolute m-auto text-red-600'>{error[0].err}</p> : <></>}
                    {serverErr ? <p className='absolute m-auto text-red-600'>{serverErrMsg}</p> : <></>}
                    {success ? <p className='absolute m-auto text-green-600'>{successMsg}</p> : <></>}
                </div>
                {success ? <button className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark
                     focus:outline-none my-1 mb-2" > <Link to='/login'>Login</Link></button> : <></>}

            </div>
        </div>
    )
}

export default ChangePassword