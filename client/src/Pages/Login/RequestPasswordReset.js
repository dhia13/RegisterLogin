import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { isEmpty } from '../Register/InputValidation'

function RequestPasswordReset() {
    //Redirect logged users to home
    const navigate = useNavigate()
    const Logged = useSelector(state => state.UserReducer.Parameters.Logged)
    useEffect(() => {
        if (Logged) {
            navigate('/')
        }
    }, [Logged, navigate])
    const [email, setEmail] = useState('')
    const error = "Please enter your email."
    const [err0, setErr0] = useState(false)
    const [valid2send, setValid2send] = useState(false)
    const [serverErr, setServerErr] = useState(false)
    const [serverErrMsg, setServerErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    //request
    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(email)) {
            setErr0(true)
            console.log(err0)
        } else {
            setValid2send(true)
            setErr0(false)
        }
        if (valid2send) {
            console.log('request sent')
            await axios.post('http://localhost:8000/requestPasswordChange', {
                email: email
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
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full relative">
                    <h1 className="mb-8 text-3xl text-center">Reset Password</h1>
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
                    </form>
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark
                     focus:outline-none my-1 mb-2" onClick={handleSubmit}>Submit
                    </button>
                    {err0 ? <p className='absolute m-auto text-red-600'>{error}</p> : <></>}
                    {serverErr ? <p className='absolute m-auto text-red-600'>{serverErrMsg}</p> : <></>}
                    {success ? <p className='absolute m-auto text-green-600'>{successMsg}</p> : <></>}
                </div>
            </div>
        </div>
    )
}

export default RequestPasswordReset