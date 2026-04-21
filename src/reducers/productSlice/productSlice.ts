import { createSlice } from '@reduxjs/toolkit'

export interface IProduct {
    id: number;
    productName: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    code: string;
    categoryId: number;
    brandId: number;
    colorId: number;
    image: string;
    images: string[];
    categoryName?: string;
    brandName?: string;
    colorName?: string;
}

export interface ProductState {
    products: IProduct[];
    currentProduct: IProduct | null;
    categories: any[];
    brands: any[];
    colors: any[];
    loading: boolean;
    totalPage: number;
}

const initialState: ProductState = {
    products: [],
    currentProduct: null,
    categories: [],
    brands: [],
    colors: [],
    loading: false,
    totalPage: 0
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase("product/getProducts/pending", (state) => {
                state.loading = true;
            })
            .addCase("product/getProducts/fulfilled", (state, action: any) => {
                // Check if the structure is { data: [...] } or just [...]
                if (Array.isArray(action.payload)) {
                    state.products = action.payload;
                } else if (action.payload && Array.isArray(action.payload.data)) {
                    state.products = action.payload.data;
                    state.totalPage = action.payload.totalPage || 0;
                } else {
                    state.products = [];
                }
                state.loading = false;
            })
            .addCase("product/getProducts/rejected", (state) => {
                state.loading = false;
            })
            .addCase("product/getProductById/fulfilled", (state, action: any) => {
                state.currentProduct = action.payload;
            })
            .addCase("product/getCategories/fulfilled", (state, action: any) => {
                state.categories = action.payload || [];
            })
            .addCase("product/getBrands/fulfilled", (state, action: any) => {
                state.brands = action.payload || [];
            })
            .addCase("product/getColors/fulfilled", (state, action: any) => {
                state.colors = action.payload || [];
            });
    }
})

export const { setCurrentProduct } = productSlice.actions
export default productSlice.reducer
