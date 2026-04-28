import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'




export interface IUserRole {
  id: string
  name: string
}

export interface IUser {
    userName: string
    userId: string
    image: string
    userRoles: IUserRole[]
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    dob: string
}

export interface IGetUsersResponse {
    pageNumber: number
    pageSize: number
    totalPage: number
    totalRecord: number
    data: IUser[]
    errors: any[]
    statusCode: number
}
export interface CounterState {
   dataOrders: IGetUsersResponse[]
}

const initialState: CounterState = {
    dataOrders: []
}



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 

        builder.addCase("user/getUser/fulfilled", (state, action: any) => {
            state.dataOrders = action.payload
        })
        
    }
})




// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer