import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductInterface } from '../../globalTypes'
import { GET_Products_URL } from '../../settings'

interface initialStateInterface {
    products: ProductInterface[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: Error | string | null
}

const initialState: initialStateInterface = {
    products: [],
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return await fetch(GET_Products_URL,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                for (const product of action.payload) {
                    for (const prop of ['id', 'height', 'width', 'weight']) {
                        product[prop] = parseFloat(product[prop])
                    }
                }
                state.products = state.products.concat(action.payload)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export default productsSlice.reducer
