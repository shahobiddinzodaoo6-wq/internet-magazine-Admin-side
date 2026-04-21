import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/url";

// Get Products with filtering and pagination
export const getProducts = createAsyncThunk("product/getProducts", async (params: any) => {
    try {
        const { data } = await axiosRequest.get("/Product/get-products", { params });
        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

// Get Product by ID
export const getProductById = createAsyncThunk("product/getProductById", async (id: number) => {
    try {
        const { data } = await axiosRequest.get(`/Product/get-product-by-id?productId=${id}`);
        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

// Add Product
export const addProduct = createAsyncThunk("product/addProduct", async (productData: any) => {
    try {
        const { data } = await axiosRequest.post("/Product/add-product", productData);
        return data;
    } catch (error: any) {
        console.error(error);
        alert("Error adding product: " + (error.response?.data?.message || error.message));
        throw error;
    }
});

// Update Product
export const updateProduct = createAsyncThunk("product/updateProduct", async (productData: any) => {
    try {
        const { data } = await axiosRequest.put("/Product/update-product", productData);
        return data;
    } catch (error: any) {
        console.error(error);
        alert("Error updating product: " + (error.response?.data?.message || error.message));
        throw error;
    }
});

// Delete Product
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: number, { dispatch }) => {
    try {
        await axiosRequest.delete(`/Product/delete-product?productId=${id}`);
        dispatch(getProducts({}));
        return id;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

// Add Image to Product
export const addImageToProduct = createAsyncThunk("product/addImage", async (formData: FormData) => {
    try {
        const { data } = await axiosRequest.post("/Product/add-image-to-product", formData);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

// Delete Image from Product
export const deleteImageFromProduct = createAsyncThunk("product/deleteImage", async (imageId: number) => {
    try {
        await axiosRequest.delete(`/Product/delete-image-from-product?imageId=${imageId}`);
        return imageId;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

// Helper APIs for form
export const getCategories = createAsyncThunk("product/getCategories", async () => {
    try {
        const { data } = await axiosRequest.get("/Category/get-categories");
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
});

export const getBrands = createAsyncThunk("product/getBrands", async () => {
    try {
        const { data } = await axiosRequest.get("/Brand/get-brands");
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
});

export const getColors = createAsyncThunk("product/getColors", async () => {
    try {
        const { data } = await axiosRequest.get("/Color/get-colors");
        return data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
});
