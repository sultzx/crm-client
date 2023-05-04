import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCreateProject = createAsyncThunk('project/fetchCreateProject', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/project', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchSetStatus = createAsyncThunk('project/fetchSetStatus', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/project/set-status', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

/////////////////////////////////////////////////////

export const fetchGetAll = createAsyncThunk('project/fetchGetAll', async () => {
    const { data } = await axios.get('/api/project/all')    
    return data
})


const initialState = {
    projects: {
        items: [],
        status: 'loading',
        error: '' 
    } 
}

const orderSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
    },
    
    extraReducers: {

        [fetchGetAll.pending]: (state) => {
            state.projects.status = 'loading'
            state.projects.items = null
        },
        [fetchGetAll.fulfilled]: (state, action) => {
            state.projects.status = 'loaded'
            state.projects.items = action.payload
        },
        [fetchGetAll.rejected]: (state) => {
            state.projects.status = 'error'
            state.projects.items = null
        },
    }
})

export const projectReducer = orderSlice.reducer

