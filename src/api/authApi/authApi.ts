import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../utils/url";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user: { userName: string; password: string }, { rejectWithValue }) => {
        try {
            const { data } = await apiInstance.post("/Account/login", user);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);