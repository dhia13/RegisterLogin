import { useDispatch } from 'react-redux'
import { LogoutAction } from '../Redux/Actions/UserActions'
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function Logout() {
        localStorage.clear()
        dispatch(LogoutAction(''))
        navigate('/login')
    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <button
                        onClick={Logout}
                        className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1 mb-2"
                    >Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Home