import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

const initialState = {
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    usuario: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) =>{
            const token = action.payload
            state.token = token
            state.isAuthenticated = true
            state.usuario = jwtDecode(token)
            localStorage.setItem("token", token)
        },
        logout: (state) =>{
            state.usuario = null
            state.token = null
            state.isAuthenticated = false
            localStorage.clear()
        },
        setAuthFromStorage: (state) =>{
            const token = localStorage.getItem("token")
            if(token){
                try {
                    const decoded = jwtDecode(token)
                    const now = Date.now() / 1000
                    if(decoded.exp > now){
                        state.token = token
                        state.isAuthenticated = true
                        state.usuario = decoded.data
                    }else{
                        localStorage.clear()
                    }
                } catch (error) {
                    localStorage.clear()
                }
            }
        }

    }
})

export const { login, logout, setAuthFromStorage } = authSlice.actions
export default authSlice.reducer