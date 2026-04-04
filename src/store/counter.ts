import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios"


interface CounterState {
    token: string | null
}

const initialState: CounterState = {
    token: null,
}




export const axiosRequest = axios.create({
    baseURL: "https://store-api.softclub.tj",
})


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        saveToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            localStorage.setItem("token", action.payload)
        },
    },
})

export const { saveToken } = counterSlice.actions
export default counterSlice.reducer