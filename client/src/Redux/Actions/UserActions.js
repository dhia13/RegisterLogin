import { LOGIN, LOGIN_ERROR, LOGOUT, UPDATEDATA } from '../Types'

export const LoginAction = (res) => async dispatch => {
    try {
        dispatch({
            type: LOGIN,
            payload: res,
            Paramaters: { logged: true }
        })
    } catch (e) {
        dispatch({
            type: LOGIN_ERROR
        })
    }
}
export const UpdateData = (res) => dispatch => {
    try {
        dispatch({
            type: UPDATEDATA,
            payload: res,
            Paramaters: { logged: true }
        })
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR
        })
    }
}
export const LogoutAction = () => dispatch => {
    dispatch({
        type: LOGOUT,
        payload: '',
        Parameters: { logged: false }
    })
}
