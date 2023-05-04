import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCreateDepartment = createAsyncThunk('department/fetchCreateDepartment', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/department', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchSetEmp = createAsyncThunk('department/fetchSetEmp', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/department/set-emp', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

/////////////////////////////////////////////////////

export const fetchGetAll = createAsyncThunk('department/fetchGetAll', async () => {
    const { data } = await axios.get('/api/department/all')    
    return data
})


const initialState = {
    departments: {
        items: [],
        status: 'loading',
        error: '' 
    } 
}

const orderSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
    },
    
    extraReducers: {

        [fetchGetAll.pending]: (state) => {
            state.departments.status = 'loading'
            state.departments.items = null
        },
        [fetchGetAll.fulfilled]: (state, action) => {
            state.departments.status = 'loaded'
            state.departments.items = action.payload
        },
        [fetchGetAll.rejected]: (state) => {
            state.departments.status = 'error'
            state.departments.items = null
        },
    }
})

export const departmentReducer = orderSlice.reducer

