import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function EmailConfirmation() {
    const navigate = useNavigate()
    const [success, setSuccess] = useState()
    const params = useParams()
    useEffect(() => {

        const confirm = async () => {
            const res = await axios.post('http://localhost:8000/activation', { activation_token: params.token })
            setSuccess(res.data.success)
            if (res.data.success) {

                setInterval(() => {
                    navigate('/login')
                }, 2500);
            }
        }
        confirm()

    }, [params, navigate])
    return (
        <div>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        {success ? <h1 className="mb-8 text-3xl text-center">account activated proceed to <Link to='/login'>login</Link> </h1> : <h1 className="mb-8 text-3xl text-center">something went wrong</h1>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation
