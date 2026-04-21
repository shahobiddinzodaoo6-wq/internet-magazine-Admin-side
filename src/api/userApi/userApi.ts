import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/url";

export const getUser = createAsyncThunk("user/getUser", async () => {
    try {
        const { data } = await axiosRequest.get("/UserProfile/get-user-profiles")
        return data.data        
    } catch (error) {
        console.error(error);
    }
})

export const addUser = createAsyncThunk("user/addUser", async (formData: FormData) => {
    try {
        const payload = {
            userName: formData.get("UserName") as string,
            email: formData.get("Email") as string,
            phoneNumber: formData.get("PhoneNumber") as string,
            password: formData.get("Password") as string,
            confirmPassword: formData.get("ConfirmPassword") as string,
        };
        const { data } = await axiosRequest.post("/Account/register", payload)
        return data
    } catch (error: any) {
        let msg = "Error: " + error.message;
        if (error.response?.data) {
            msg += "\nDetails: " + JSON.stringify(error.response.data, null, 2);
        }
        alert(msg);
        throw error;
    }
})

export const updateUser = createAsyncThunk("user/updateUser", async (formData: FormData) => {
    try {
        const { data } = await axiosRequest.put("/UserProfile/update-user-profile", formData)
        return data
    } catch (error: any) {
        let msg = "Error: " + error.message;
        if (error.response?.data) {
            msg += "\nDetails: " + JSON.stringify(error.response.data, null, 2);
        }
        alert(msg);
        throw error;
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: string, { dispatch }) => {
    try {
        await axiosRequest.delete(`/UserProfile/delete-user-profile?id=${id}`)
        dispatch(getUser())
        return id
    } catch (error) {
        console.error(error);
        throw error;
    }
})
