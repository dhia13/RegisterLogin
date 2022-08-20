import { LOGIN, LOGOUT, UPDATEDATA } from '../Types'
const LocalStorage = JSON.parse(window.localStorage.getItem('UserInfo'));
const initialState = (LocalStorage) ? { UserData: { ...LocalStorage }, Parameters: { Logged: true } } : {
    Parameters: {
        Logged: false,
    },
    UserData: {
        name: '',
        email: '',
        pic: '',
    }
}
export default function UserReducer(state = initialState, action) {
    switch (action.type) {

        case LOGIN:
            return {
                ...state.LocalStorage,
                UserData: action.payload,
                Parameters: { Logged: true }
            }
        case UPDATEDATA:
            return {
                ...state.localStorage,
                UserData: action.payload,
                Parameters: { Logged: true }
            }
        case LOGOUT:
            return {
                ...state.LocalStorage,
                UserData: '',
                Parameters: { Logged: false }
            }
        default: return state
    }
}