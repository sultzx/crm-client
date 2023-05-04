import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCreateOrder = createAsyncThunk('order/fetchCreateOrder', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/order', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

/////////////////////////////////////////////////////

export const fetchGetAll = createAsyncThunk('order/fetchGetAll', async () => {
    const { data } = await axios.get('/api/order/all')    
    return data
})


const initialState = {
    orders: {
        items: [],
        status: 'loading',
        error: '' 
    } ,
    data: null,
    status: 'loading',
    error: ''
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    
    extraReducers: {

        [fetchGetAll.pending]: (state) => {
            state.orders.status = 'loading'
            state.orders.items = null
        },
        [fetchGetAll.fulfilled]: (state, action) => {
            state.orders.status = 'loaded'
            state.orders.items = action.payload
        },
        [fetchGetAll.rejected]: (state) => {
            state.orders.status = 'error'
            state.orders.items = null
        },


        [fetchCreateOrder.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchCreateOrder.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchCreateOrder.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

    }
})

export const orderReducer = orderSlice.reducer

