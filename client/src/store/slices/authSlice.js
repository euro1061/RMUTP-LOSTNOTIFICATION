import { createSlice } from '@reduxjs/toolkit'

const initalToken = sessionStorage.getItem('token');
let token = initalToken;
const userIsLoggedIn = !!token;

const initialValue = {
    token: token,
    isLoggedIn: userIsLoggedIn
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        login: (state, action) => {
            sessionStorage.setItem('token', action.payload.token)
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logout: (state) => {
            sessionStorage.removeItem('token')
            state.token = null
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = authSlice.actions
export const authSelector = (store) => store.authSliceReducer
export default authSlice.reducer